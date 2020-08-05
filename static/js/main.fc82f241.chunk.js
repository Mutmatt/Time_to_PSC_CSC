(this.webpackJsonptime_to_psc_csc=this.webpackJsonptime_to_psc_csc||[]).push([[0],{178:function(e,t,a){e.exports=a(410)},183:function(e,t,a){},226:function(e,t){},240:function(e,t){},242:function(e,t){},406:function(e,t,a){},410:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(172),i=a.n(r),c=(a(183),a(16)),o=a(17),l=a(12),m=a(61),h=a(60),p=a(176),u=a(173),d=a(177),C=a(21),v=a.n(C),g="You should go to {0} (Primary Stroke Center)",y="You should go to {0} (Comprehensive Stroke Center)",f=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState({[e.target.name]:e.target.value}),n.triggerHospitalChange([e.target.name],[e.target.value])},n.triggerHospitalChange=function(e,t){v.a.forEach(e,(function(e,a){n.state[e]=t[a]})),n.isCsc()?(n.setState({isCsc:!0}),n.setState({decisionText:y})):(n.setState({isCsc:!1}),n.setState({decisionText:g}))},n.isCsc=function(e){var t=e||n.state,a=t.ttCsc,s=t.ttPsc,r=t.ttBetween,i=t.cscNeedle,c=t.pscNeedle,o=parseInt(a,10),l=parseInt(s,10),m=parseInt(r,10);return!(o+parseInt(i,10)>l+parseInt(c,10)+m)};var s=0,r=15,i=45;e.timeBetween?s=e.timeBetween:e.type!==j&&(s=30),e.pscList&&e.pscList[0]&&e.pscList[0].timeTo&&(r=e.pscList[0].timeTo),e.cscList&&e.cscList[0]&&e.cscList[0].timeTo&&(i=e.cscList[0].timeTo);var o={cscNeedle:30,pscNeedle:30,ttPsc:r,ttCsc:i,ttBetween:s,cpc:!1,isCsc:!1,decisionText:"You should go to {0} (Primary Stroke Center)"};return n.isCsc(o)&&(o.decisionText=y,o.isCsc=!0),n.state=o,n.state.decisionText=o.decisionText,n.state.isCsc=o.isCsc,n.renderClosestHospital=n.renderClosestHospital.bind(Object(l.a)(n)),n.renderDecisionText=n.renderDecisionText.bind(Object(l.a)(n)),n.isCsc=n.isCsc.bind(Object(l.a)(n)),n.handleChange=n.handleChange.bind(Object(l.a)(n)),n.renderSecondaryHospital=n.renderSecondaryHospital.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"renderClosestHospital",value:function(e,t){if(t)return s.a.createElement("label",null,"Closest ",e,":",s.a.createElement("br",null)," ",t.name," - ",t.city)}},{key:"renderDecisionText",value:function(e,t){return e.replace(/\{0\}/,"".concat(t.name," - ").concat(t.city))}},{key:"renderSecondaryHospital",value:function(e,t,a){var n=parseInt(e.timeTo,10)+parseInt(t,10);return"".concat(e.name," - ").concat(e.city," (").concat(a,": ").concat(n," minutes)")}},{key:"render",value:function(){var e=this.props,t=e.title,a=e.rangeMessages,n=e.type,r=e.pscList,i=e.cscList,c=e.secondaryTimeToMessage,o=this.state,l=o.cscNeedle,m=o.pscNeedle,h=o.ttPsc,p=o.ttCsc,u=o.ttBetween,d=o.isCsc,C=o.decisionText;return s.a.createElement("div",null,s.a.createElement("div",{className:"row mt-3 mb-3"},s.a.createElement("h2",{className:"col-12 text-center"},"Time to ",t)),s.a.createElement("form",null,s.a.createElement("div",{className:"row align-items-center"},s.a.createElement("label",{className:"col-"+(n===j?"6":"4"),htmlFor:"time-to-psc"},"Time to Primary Stroke Center"),s.a.createElement("label",{className:"col-"+(n===j?"6":"4"),htmlFor:"time-to-csc"},"Time to Comprehensive Stroke Center"),s.a.createElement("label",{className:"col-"+(n===j?" d-none":"4"),htmlFor:"time-between"},"Time from Primary Stroke Center to Comprehensive Stroke Center")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-"+(n===j?"6":"4")},s.a.createElement("div",{className:"form-group"},this.renderClosestHospital("PSC",r[0]),s.a.createElement("input",{className:"form-control",type:"number",name:"ttPsc",id:"time-to-psc",value:h,onChange:this.handleChange}))),s.a.createElement("div",{className:"col-"+(n===j?"6":"4")},s.a.createElement("div",{className:"form-group"},this.renderClosestHospital("CSC",i[0]),s.a.createElement("input",{className:"form-control",type:"number",name:"ttCsc",id:"time-to-csc",value:p,onChange:this.handleChange}))),s.a.createElement("div",{className:"col-"+(n===j?" d-none":"4")},s.a.createElement("div",{className:"form-group"},s.a.createElement("input",{className:"form-control",type:"number",name:"ttBetween",id:"time-between",value:u,onChange:this.handleChange})))),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"pscNeedle"},a[0]," ",m),s.a.createElement("input",{type:"range",min:1,max:120,className:"form-control-range",id:"pscNeedle",name:"pscNeedle",value:m,onChange:this.handleChange}),s.a.createElement("label",{htmlFor:"cscNeedle"},a[1]," ",l),s.a.createElement("input",{type:"range",min:1,max:120,className:"form-control-range",id:"cscNeedle",name:"cscNeedle",value:l,onChange:this.handleChange})),s.a.createElement("div",{className:"row align-items-center"},s.a.createElement("div",{className:"col-6 text-right"},s.a.createElement("span",null,"Total time to ",t," if")),s.a.createElement("div",{className:"col-6"},s.a.createElement("p",null,"PSC First: ",s.a.createElement("strong",null,parseInt(this.state.pscNeedle,10)+parseInt(this.state.ttPsc,10)+parseInt(this.state.ttBetween,10))),s.a.createElement("p",null,"CSC First: ",s.a.createElement("strong",null,parseInt(this.state.cscNeedle,10)+parseInt(this.state.ttCsc,10))))),s.a.createElement("div",{className:"form-group"},s.a.createElement("h2",{className:"col-12 text-center alert alert-"+(d?"danger":"dark")},this.renderDecisionText(C,d?i[0]:r[0])))),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("h3",null,"Secondary PSCs"),s.a.createElement("ul",null,s.a.createElement("li",null,this.renderSecondaryHospital(r[1],this.state.pscNeedle,c)),s.a.createElement("li",null,this.renderSecondaryHospital(r[2],this.state.pscNeedle,c)),s.a.createElement("li",null,this.renderSecondaryHospital(r[3],this.state.pscNeedle,c)))),s.a.createElement("div",{className:"col-6"},s.a.createElement("h3",null,"Secondary CSCs"),s.a.createElement("ul",null,s.a.createElement("li",null,this.renderSecondaryHospital(i[1],this.state.cscNeedle,c)),s.a.createElement("li",null,this.renderSecondaryHospital(i[2],this.state.cscNeedle,c)),s.a.createElement("li",null,this.renderSecondaryHospital(i[3],this.state.cscNeedle,c))))))}}]),a}(n.Component),S=a(38),k=a.n(S),b=a(95),E=a(174),N=a.n(E),T=a(175),x=a.n(T),w=a(412),H=a(1),I=a(9),O=new w.a("AIzaSyCqxld5y5OsQBBi-euCeNG_6vyi_YFfc6o",{}),P=function(){function e(){Object(c.a)(this,e),this.comprehensiveStrokeCenters=Object(H.l)([]),this.primaryStrokeCenters=Object(H.l)([]),this.position={latitude:0,longitude:0},this.downloadNewList=this.downloadNewList.bind(this),this.getLocation=this.getLocation.bind(this),this.hasCsc=this.hasCsc.bind(this),this.hasPsc=this.hasPsc.bind(this)}return Object(o.a)(e,[{key:"getLocation",value:function(){var e=Object(b.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){navigator.geolocation.getCurrentPosition((function(t){e(t)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"setUserPosition",value:function(e){this.position={lat:e.coords.latitude,lng:e.coords.longitude}}},{key:"hasCsc",value:function(){return this.comprehensiveStrokeCenters||this.comprehensiveStrokeCenters.replace(sessionStorage.getItem("csc")),!!this.comprehensiveStrokeCenters}},{key:"hasPsc",value:function(){return this.primaryStrokeCenters||this.primaryStrokeCenters.replace(sessionStorage.getItem("psc")),!!this.primaryStrokeCenters}},{key:"downloadNewList",value:function(){var e=Object(b.a)(k.a.mark((function e(){var t,a,n,s,r,i,c,o,l,m,h,p,u,d,C,g=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0!==this.position.longitude||0!==this.position.latitude)&&this.position){e.next=6;break}return e.t0=this,e.next=4,this.getLocation();case 4:e.t1=e.sent,e.t0.setUserPosition.call(e.t0,e.t1);case 6:return e.next=8,N()({url:"https://api.codetabs.com/v1/proxy?quest=https://www.health.state.mn.us/diseases/cardiovascular/stroke/designationlist.html"});case 8:return t=e.sent,a=x.a.load(t.data),n=a('h2:contains("Comprehensive Stroke Center")').next("ol").children("li"),v.a.forEach(n,(function(e){g.comprehensiveStrokeCenters.push(Object(H.l)(g.parseHospital(e)))})),s=a('h2:contains("Primary Stroke Centers")').next("ol").children("li"),v.a.forEach(s,(function(e){g.primaryStrokeCenters.push(Object(H.l)(g.parseHospital(e)))})),e.next=16,O.load();case 16:return r=e.sent,i=new r.maps.DistanceMatrixService,c=Object(I.promisify)(i.getDistanceMatrix),o=this.position,e.prev=20,e.next=23,c({origins:[o],destinations:this.comprehensiveStrokeCenters.map((function(e){return"".concat(e.name," ").concat(e.city)})),travelMode:"DRIVING"});case 23:l=e.sent,m=this.parseDistanceMatrixResults(this.comprehensiveStrokeCenters,l),this.comprehensiveStrokeCenters.replace(m),e.next=32;break;case 28:e.prev=28,e.t2=e.catch(20),h=this.parseDistanceMatrixResults(this.comprehensiveStrokeCenters,e.t2),this.comprehensiveStrokeCenters.replace(h);case 32:return e.prev=32,e.next=35,c({origins:[o],destinations:this.primaryStrokeCenters.map((function(e){return"".concat(e.name," ").concat(e.city)})),travelMode:"DRIVING"});case 35:p=e.sent,u=this.parseDistanceMatrixResults(this.primaryStrokeCenters,p),this.primaryStrokeCenters.replace(u),e.next=44;break;case 40:e.prev=40,e.t3=e.catch(32),d=this.parseDistanceMatrixResults(this.primaryStrokeCenters,e.t3),this.primaryStrokeCenters.replace(d);case 44:return e.prev=44,e.next=47,c({origins:["".concat(this.primaryStrokeCenters[0].name," ").concat(this.primaryStrokeCenters[0].city)],destinations:["".concat(this.comprehensiveStrokeCenters[0].name," ").concat(this.comprehensiveStrokeCenters[0].city)],travelMode:"DRIVING"});case 47:C=e.sent,this.timeBetween=this.parseDistanceMatrixResults([{}],C)[0].timeTo,e.next=54;break;case 51:e.prev=51,e.t4=e.catch(44),this.timeBetween=this.parseDistanceMatrixResults([{}],e.t4)[0].timeTo;case 54:return sessionStorage.setItem("csc",this.comprehensiveStrokeCenters),sessionStorage.setItem("psc",this.primaryStrokeCenters),e.abrupt("return");case 57:case"end":return e.stop()}}),e,this,[[20,28],[32,40],[44,51]])})));return function(){return e.apply(this,arguments)}}()},{key:"parseDistanceMatrixResults",value:function(e,t){return v.a.forEach(t.rows[0].elements,(function(t,a){"OK"===t.status?(e[a].timeTo=Math.round(t.duration.value/60),e[a].timeToText=t.duration.text,e[a].timeToDistance=t.distance.text):(e[a].timeTo=99999999,e[a].timeToText="Failed Request",e[a].timeToDistance="Failed Request")})),v.a.orderBy(e,"timeTo","asc")}},{key:"parseHospital",value:function(e){var t=e.children[0].data.replace(/[\xe2\x80\u2013]/g,"-").replace(/[^\x00-\x7F]/g,"").split("-");if(3===t.length){var a=t[1].replace(/.*, /,"");t[0]=t[0]+a,t.splice(1,1)}return{name:t[0].trim(),city:t[1].trim()}}}]),e}(),j=(a(406),"IV Alteplase"),D=Object(p.a)(function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e,n){var s;return Object(c.a)(this,a),(s=t.call(this,e,n)).handleTabClick=function(e){e.preventDefault(),s.setState({tab:e.target.name})},s.handleTabClick=s.handleTabClick.bind(Object(l.a)(s)),s.state={tab:j,cscs:[],pscs:[],timeBetween:-1,loading:!0},s.locationHandler=new P,!s.locationHandler.hasCsc()&&s.locationHandler.hasPsc()||s.locationHandler.downloadNewList().then((function(){s.setState({tab:j,loading:!1})})),s}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.tab;return e.loading?s.a.createElement("div",{className:"row",style:{height:"50em"}},s.a.createElement("div",{className:"mx-auto",style:{paddingTop:"40%"}},s.a.createElement(u.a,{icon:d.a,spin:!0,size:"10x"}))):s.a.createElement("div",{className:"mt-1"},s.a.createElement("nav",{className:"nav nav-tabs"},s.a.createElement("a",{className:"nav-item nav-link "+(t===j?"active":""),name:j,href:"#/",onClick:this.handleTabClick},"IV Alteplase"),s.a.createElement("a",{className:"nav-item nav-link "+("Thrombectomy"===t?"active":""),name:"Thrombectomy",href:"#/",onClick:this.handleTabClick},"Thrombectomy")),t===j?s.a.createElement(f,{type:j,title:"IV Alteplase",rangeMessages:["PSC Door-to-Needle Time:","CSC Door-to-Needle Time:"],secondaryTimeToMessage:"time to tPA",cscList:this.locationHandler.comprehensiveStrokeCenters,pscList:this.locationHandler.primaryStrokeCenters}):null,"Thrombectomy"===t?s.a.createElement(f,{type:"Thrombectomy",title:"Arterial Puncture",rangeMessages:["PSC Door-in-Door-out Time:","CSC Door-to-Arterial Puncture Time:"],secondaryTimeToMessage:"time to puncture",timeBetween:this.locationHandler.timeBetween,cscList:this.locationHandler.comprehensiveStrokeCenters,pscList:this.locationHandler.primaryStrokeCenters}):null)}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(407).config(),i.a.render(s.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[178,1,2]]]);
//# sourceMappingURL=main.fc82f241.chunk.js.map