//why would you ever, EVER arrange geospatial data this way, do you hate yourself or something
var events = {
	
	1: {lat: 41.268891, lng: -73.495006}, //aldrich
	2: {lat: 40.448433, lng: -80.001847},//warhol
	3: {lat: 39.193644, lng: -106.81656},	//aspen
	4: {lat: 33.772947, lng: -84.405216}, //atlanta
	5: {lat: 29.724628, lng: -95.342793}, //blaffer
	6: {lat: 43.894261, lng: -69.972306}, //bowdoin
	7: {lat: 42.732714, lng: -84.476806}, //broad
	8: {lat: 44.565058, lng: -69.660744}, //colby
	9: {lat: 42.980994, lng: -85.590278}, //camstl 
	10: {lat: 29.726257, lng: -95.391068}, //houston
	11: {lat: 40.938720, lng: -72.306219}, //flavin
	12: {lat: 42.979849, lng: -85.585609}, //meijer
	13: {lat: 39.906242, lng: -79.467943}, //falling water
	14: {lat: 36.157536, lng: -86.783587}, //frist
	15: {lat: 41.145265, lng: -73.51218}, //glass house
	16: {lat: 40.756095, lng: -73.98376}, //icp
	17: {lat: 39.04639, lng: -94.585149}, //kemper
	18: {lat: 35.142312, lng: -89.996068}, //memphis
	19: {lat: 29.737828, lng: -95.398104}, //menil
	20: {lat: 42.3537, lng: -83.061558},  //detroit
	21: {lat: 40.90465, lng: -72.365977}, //parrish
	22: {lat: 43.653878, lng: -70.262315},  //portland
	23: {lat: 38.64022, lng: -90.2345}, //pulitzer
	24: {lat: 42.31853, lng: -72.635738},  //smith
	25: {lat: 44.9684358, lng: -93.2885414,}, //walker
	26: {lat: 37.785798, lng: -122.402424}  //ybc

};
var map;
var geocoder = null;
var gdir;
var addressMarker;

function load() {
  if (GBrowserIsCompatible()) {

    var map = new GMap2(document.getElementById("map"));
	map.setMapType(G_NORMAL_MAP);
    map.setCenter(new GLatLng(40.01, -98.0), 4);
    map.addControl(new GSmallZoomControl(), new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(0, 0)));
	map.addControl(new GMapTypeControl(), new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(10, 10)));
	map.addControl(createControl("guidelink"), new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(30, 20)));

	
	// Add the event markers to the map--WHY WOULD YOU DO THIS, THIS IS THE WORST CODE CHOICE
	for (var eventNum in events) {
		var event = events[eventNum];
		event.content = document.getElementById("event" + eventNum);
		event.marker = createEventMarker(eventNum);
		map.addOverlay(event.marker);
	}
	//Directions
	gdir = new GDirections(map, document.getElementById("directions"));
	GEvent.addListener(gdir, "load", onGDirectionsLoad);
	GEvent.addListener(gdir, "error", handleErrors);
	
	
	// Listen for events that may change the bounds of the map
	GEvent.addListener(map, "zoomend", boundsChanged);
	GEvent.addListener(map, "dragend", boundsChanged);
	setInterval(boundsChanged, 2000);

  }
}

//get controls

function createControl(fromId) {
var control = function() { }
control.prototype = new GControl();
control.prototype.initialize = function(map) {
var node = document.getElementById(fromId);
map.getContainer().appendChild(node);
return node;
 }
return new control(true, false);
}

function createEventMarker(eventNum) {
	var event = events[eventNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + eventNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(12, 12);
	icon.infoWindowAnchor = new GPoint(12, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;


}

function showEvent(eventNum) {
var event = events[eventNum];
event.marker.openInfoWindow(event.content);
}

function setDirections(fromAddress, toAddress) {
gdir.load("from: " + fromAddress + " to: " + toAddress);
}
