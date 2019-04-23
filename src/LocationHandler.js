import rp from "request-promise-native";
import cheerio from "cheerio";
import _ from "lodash";

var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyAGZX9cdeWsmegU4ODemgrLNYuzNhlw6cw';
GoogleMapsLoader.LIBRARIES = [];
GoogleMapsLoader.VERSION = '3.36';

class LocationHandler { 
  comprehensiveStrokeCenters = [];
  primaryStrokeCenters = [];
  position = { latitude: 0, longitude: 0 };
  geo;
  timeBetween;

  constructor() {
    if (navigator.geolocation) {
      this.geo = navigator.geolocation;
      this.geo.getCurrentPosition((position) => {
        this.setUserPosition(position);
      });
    }
  }

  setUserPosition(position) {
    this.position = { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  hasCsc() {
    if (!this.comprehensiveStrokeCenters) {
      this.comprehensiveStrokeCenters = sessionStorage.getItem('csc')
    }
    return !!this.comprehensiveStrokeCenters
  }

  hasPsc() {
    if (!this.primaryStrokeCenters) {
      this.primaryStrokeCenters = sessionStorage.getItem('psc')
    }
    return !!this.primaryStrokeCenters
  }

  async getComprehensiveCenters() {
    if (!this.hasCsc()) {
      await this.downloadNewList();
    }
    return this.comprehensiveStrokeCenters;
  }

  async getPrimaryCenters() {
    if (!this.hasPsc()) {
      await this.downloadNewList();
    }
    return this.primaryStrokeCenters;
  }

  async downloadNewList() {
    var promises = [];
    if (!this.position) {
      promises.push(new Promise((resolve) => this.geo.getCurrentPosition((position) => {
        this.setUserPosition(position);
        resolve();
      })));
    }
    await Promise.all(promises);

    this.comprehensiveStrokeCenters = [];
    this.primaryStrokeCenters = [];
    var options = {
      uri: 'https://cors.io/?https://www.health.state.mn.us/diseases/cardiovascular/stroke/designationlist.html',
      transform: (body) => {
        return cheerio.load(body);
      }
    };
    var body = await rp(options);
    var csc = body('h2:contains("Comprehensive Stroke Center")').next('ol').children('li');
    _.forEach(csc, (item) => {
      this.comprehensiveStrokeCenters.push(this.parseHospital(item));
     });
    var psc = body('h2:contains("Primary Stroke Centers")').next('ol').children('li');
    _.forEach(psc, (item) => { 
      this.primaryStrokeCenters.push(this.parseHospital(item));
    });

    promises = [];
    var matrixService, myLatLng;
    promises.push(
      new Promise((resolve) => {
        GoogleMapsLoader.load((google) => {
          myLatLng = new google.maps.LatLng(this.position);
          matrixService = new google.maps.DistanceMatrixService();
          resolve(matrixService);
        });
      })
    );
    await Promise.all(promises);

    promises = [];
    promises.push(new Promise((resolve) => {
      matrixService.getDistanceMatrix(
      { origins: [ myLatLng ],
        destinations: this.comprehensiveStrokeCenters.map((csc) => `${csc.name} ${csc.city}` ),
        travelMode: 'DRIVING',
      }, (response) => {
        this.comprehensiveStrokeCenters = this.parseDistanceMatrixResults(this.comprehensiveStrokeCenters, response);
        resolve();
      });
    }));

    promises.push(new Promise((resolve) => {
      matrixService.getDistanceMatrix(
      { origins: [ myLatLng ],
        destinations: this.primaryStrokeCenters.map((psc) => `${psc.name} ${psc.city}` ),
        travelMode: 'DRIVING',
      }, (response) => {
        this.primaryStrokeCenters = this.parseDistanceMatrixResults(this.primaryStrokeCenters, response);
        resolve();
      });
    }));
    
    await Promise.all(promises);

    promises = [];
    promises.push(new Promise((resolve) => {
      matrixService.getDistanceMatrix(
      { origins: [ `${this.primaryStrokeCenters[0].name} ${this.primaryStrokeCenters[0].city}` ],
        destinations: [ `${this.comprehensiveStrokeCenters[0].name} ${this.comprehensiveStrokeCenters[0].city}` ],
        travelMode: 'DRIVING',
      }, (response) => {
        this.timeBetween = this.parseDistanceMatrixResults([{}], response)[0].timeTo;
        console.log(this.timeBetween);
        resolve();
      });
    }));

    await Promise.all(promises);
    sessionStorage.setItem('csc', this.comprehensiveStrokeCenters);
    sessionStorage.setItem('psc', this.primaryStrokeCenters);
  }

  parseDistanceMatrixResults(hospitalList, response) {
    _.forEach(response.rows[0].elements, (matrixItem, index) => {
      if (matrixItem.status === 'OK') {
        hospitalList[index].timeTo = Math.round(matrixItem.duration.value / 60);//seconds to minutes and round
        hospitalList[index].timeToText = matrixItem.duration.text;
        hospitalList[index].timeToDistance = matrixItem.distance.text;
      } else {
        hospitalList[index].timeTo = 99999999;
        hospitalList[index].timeToText = "Failed Request";
        hospitalList[index].timeToDistance = "Failed Request";
      }
    });
    return _.orderBy(hospitalList, 'timeTo', 'asc');
  }

  getClosest(hospitalList) {
    var closest = { longitude: -1, latitude: -1, overall: -1, index: -1 };
    hospitalList.forEach((hospital, index) => {
      if (hospital.location) {
        var longDelta = Math.abs(this.position.longitude - hospital.location.longitude);
        var latDelta = Math.abs(this.position.latitude - hospital.location.latitude);
        if (longDelta + latDelta < closest.overall
            || closest.overall === -1) {
           closest = { 
            longitude: longDelta,
            latitude: latDelta,
            overall: (longDelta + latDelta),
            index: index,
            hospital: hospital
          };
        }
      }
    });
    return closest;
  }


  parseHospital(item) {
    //for some reason they have a multi-part string for a hospital -_- (e.g. Mayo Clinic Hospital – Rochester, Saint Mary’s Campus – Rochester)
    // We want ["Mayo Clinic Hospital, Saint Mary’s Campus", "Rochester"]
    var listItem = item.children[0].data;
    listItem = listItem.replace('â', '-');
    listItem = listItem.replace(/[^\x00-\x7F]/g, "");
    var hospital = listItem.split('-');
    if (hospital.length === 3) {
      var newHospitalName = hospital[1].replace(/.*, / ,'');
      hospital[0] = hospital[0] + newHospitalName;
      hospital.splice(1, 1);
    }
    hospital[0] = hospital[0].trim();
    hospital[1] = hospital[1].trim();

    return { name: hospital[0], city: hospital[1] };
  }
}

export default LocationHandler;