"use strict";var depModules=["ngRoute","monospaced.qrcode","ngAnimate","mgcrea.ngStrap","mgcrea.ngStrap.helpers.parseOptions","google-maps","webStorageModule","ngResource","ngSanitize"];angular.module("eastApp",depModules),angular.module("eastApp").config(["$routeProvider","$locationProvider",function(a,b){var c="views/",d=["home","artists","exhibitions","events","sponsors","tour","admin","image"],e=d[0];a.when("/:view?",{title:"East App",templateUrl:function(a){var b=a.view,f=d.indexOf(b)>=0,g=f?b:e;return c+g+".html"}}),a.otherwise({redirectTo:"/"}),b.hashPrefix("!")}]),angular.module("eastApp").controller("MainCtrl",["$scope","Artflask","$timeout",function(a,b,c){function d(b){for(var c=a.mediums.length-1;c>=0;c--)if(a.mediums[c].name===b)return!0;return!1}var e=b.getVenuesResource();a.venues=!0,a.mediums=[],a.searchVenue=!1,a.setSearchVenue=function(b){a.searchVenue=b.currentTarget.value},e.query(function(b){b.forEach(function(b){b.mediums.forEach(function(b){if(!d(b)){var c=b.charAt(0).toUpperCase()+b.substr(1);a.mediums.push({name:b,html:'<img class="mediumIcon" src=\'images/'+b+".svg'>"+c})}})}),c(function(){a.venues=b})})}]),angular.module("eastApp").service("Artflask",["$resource",function(a){var b="http://east.gluu.org/api/v1",c=a(b+"/art/:art_id/:action",{art_id:"@id"}),d=a(b+"/artists/:artist_id"),e=a(b+"/events/:event_name"),f=a(b+"/venues/:venue_id"),g=a(b+"/register/:registration_id",{registration_id:"@id"}),h=a(b+"/profile"),i=a(b+"/staff/:staff_id",{staff_id:"@id"});return{getEndPoint:function(){return b},getArtResource:function(){return c},getArtistsResource:function(){return d},getEventsResource:function(){return e},getVenuesResource:function(){return f},getRegisterResource:function(){return g},getProfileResource:function(){return h},getStaffResource:function(){return i}}}]),angular.module("eastApp").controller("MapCtrl",["$scope",function(a){a.map={zoom:15,center:{latitude:30.2646809,longitude:-97.6979548}},a.mapOptions={styles:[{featureType:"water",stylers:[{color:"#46bcec"},{visibility:"on"}]},{featureType:"landscape",stylers:[{color:"#f2f2f2"}]},{featureType:"road",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]}]}}]),angular.module("eastApp").directive("gallery",["$timeout","Artflask",function(a,b){return{templateUrl:"views/directives/gallery.html",restrict:"E",scope:!1,link:function(c){if(!c.venues){var d=b.getVenuesResource();d.query(function(b){a(function(){c.venues=b})})}c.filterSearchOptions=function(a){if(c.searchVenue){var b=c.searchVenue.toLowerCase();if(a.name.toLowerCase().indexOf(b)>=0)return!0;if((a.site_id+"").indexOf(b)>=0)return!0;for(var d=0;d<a.mediums.length;d++)if(a.mediums[d].toLowerCase().indexOf(b)>=0)return!0;return!1}return!0},c.venueClicked=function(a){c.selectedVenue=a}}}}]),angular.module("eastApp").directive("venue",function(){return{templateUrl:"views/directives/venue.html",restrict:"E",scope:{entity:"=",featured:"@"}}}),angular.module("eastApp").directive("uploadPicture",["$timeout","$modal",function(a,b){return{templateUrl:"views/directives/uploadpicture.html",restrict:"A",replace:!0,link:function(a,c){c.on("click",function(){b({title:"Upload a Picture",contentTemplate:"views/directives/uploadpicture-modal.html"})})}}}]);