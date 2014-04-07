//set up data for shows
var events = {
	
	2: {lat: 39.196635, lng: -106.827261,},
	3: {lat: 42.447798, lng: -73.254178,},
	4: {lat: 29.721429, lng: -95.338631,},
	6: {lat: 44.556051, lng: -69.653214,},
	8: {lat: 41.504541, lng: -73.983669,},
	9: {lat: 39.910464, lng: -79.458711,},
	10: {lat: 42.980994, lng: -85.590278,},
	11: {lat: 40.971803, lng: -72.181699,},
	13: {lat: 40.456769, lng: -80.013175,},
	15: {lat: 33.478636, lng: -81.968537,},
	16: {lat: 42.353037, lng: -83.061739,},
	17: {lat: 32.218396, lng: -110.971947,},
	19: {lat: 38.640388, lng: -90.233538,},
	20: {lat: 42.318789, lng: -72.636234,},
	23: {lat: 36.066235, lng: -79.805253,},
	24: {lat: 37.786329, lng: -122.401882,},
	25: {lat: 32.778617, lng: -79.931316,},

		
		
		
		};
var warhol = {1: {lat: 40.448433, lng: -80.001847,} };
var walk = {22: {lat: 44.9684358, lng: -93.2885414,} };		
var camstl = {5: {lat: 38.640714, lng: -90.234975,} };
var dia = {7: {lat: 42.358675, lng: -83.065357,} };
var icp = {12: {lat: 40.756095, lng: -73.98376,} };
var secca = {21: {lat: 36.119937, lng: -80.287518,} };
var parrish = {18: {lat: 40.902355, lng: -72.366148,} };
var menil = {14: {lat: 29.737828, lng: -95.398104,} };
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

	
	// Add the 18 event markers to the map WHY WOULD YOU DO THIS, THIS IS THE WORST CODE CHOICE
	for (var eventNum in events) {
		var event = events[eventNum];
		event.content = document.getElementById("event" + eventNum);
		event.marker = createEventMarker(eventNum);
		map.addOverlay(event.marker);
	}
	for (var walkNum in walk) {
		var event = walk[walkNum];
		event.content = document.getElementById("event" + walkNum);
		event.marker = createwalkMarker(walkNum);
		map.addOverlay(event.marker);
	
	}
	for (var camstlNum in camstl) {
		var event = camstl[camstlNum];
		event.content = document.getElementById("event" + camstlNum);
		event.marker = createcamstlMarker(camstlNum);
		map.addOverlay(event.marker);
		
	}
	for (var diaNum in dia) {
		var event = dia[diaNum];
		event.content = document.getElementById("event" + diaNum);
		event.marker = creatediaMarker(diaNum);
		map.addOverlay(event.marker);
	}
	for (var warholNum in warhol) {
		var event = warhol[warholNum];
		event.content = document.getElementById("event" + warholNum);
		event.marker = createwarholMarker(warholNum);
		map.addOverlay(event.marker);

	}
	for (var icpNum in icp) {
		var event = icp[icpNum];
		event.content = document.getElementById("event" + icpNum);
		event.marker = createicpMarker(icpNum);
		map.addOverlay(event.marker);
	
	}
	for (var seccaNum in secca) {
		var event = secca[seccaNum];
		event.content = document.getElementById("event" + seccaNum);
		event.marker = createseccaMarker(seccaNum);
		map.addOverlay(event.marker);

	}
	for (var parrishNum in parrish) {
		var event = parrish[parrishNum];
		event.content = document.getElementById("event" + parrishNum);
		event.marker = createparrishMarker(parrishNum);
		map.addOverlay(event.marker);
	}
	for (var menilNum in menil) {
		var event = menil[menilNum];
		event.content = document.getElementById("event" + menilNum);
		event.marker = createmenilMarker(menilNum);
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
function createwalkMarker(walkNum) {
	var event = walk[walkNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + walkNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 20);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}
function createcamstlMarker(camstlNum) {
	var event = camstl[camstlNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + camstlNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 20);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}

function creatediaMarker(diaNum) {
	var event = dia[diaNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + diaNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}

function createwarholMarker(warholNum) {
	var event = warhol[warholNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + warholNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(15, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}

function createicpMarker(icpNum) {
	var event = icp[icpNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + icpNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}

function createseccaMarker(seccaNum) {
	var event = secca[seccaNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + seccaNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;

}

function createmodMarker(modNum) {
	var event = mod[modNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + modNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;
	
}

function createberkMarker(berkNum) {
	var event = berk[berkNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + berkNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(20, 20);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;
}

function createparrishMarker(parrishNum) {
	var event = parrish[parrishNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + parrishNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;
}

function createmenilMarker(menilNum) {
	var event = menil[menilNum];
	var icon = new GIcon();
	icon.image = "http://bombsite.powweb.com/logos/" + menilNum +".gif";
	icon.iconSize = new GSize(18, 18);
	icon.iconAnchor = new GPoint(0, 0);
	icon.infoWindowAnchor = new GPoint(0, 0);
	var marker = new GMarker(new GLatLng(event.lat, event.lng), {icon: icon});
	GEvent.addListener(marker, "click", function() { marker.openInfoWindow(event.content); });
	return marker;
}
function showEvent(eventNum) {
var event = events[eventNum];
event.marker.openInfoWindow(event.content);

}
function showwalk(walkNum) {
	var event = walk[walkNum];
	event.marker.openInfoWindow(event.content);

}
function showcamstl(camstlNum) {
	var event = camstl[camstlNum];
	event.marker.openInfoWindow(event.content);

}
function showdia(diaNum) {
	var event = dia[diaNum];
	event.marker.openInfoWindow(event.content);

}
function showwarhol(warholNum) {
	var event = warhol[warholNum];
	event.marker.openInfoWindow(event.content);

}
function showicp(icpNum) {
	var event = icp[icpNum];
	event.marker.openInfoWindow(event.content);

}
function showsecca(seccaNum) {
	var event = secca[seccaNum];
	event.marker.openInfoWindow(event.content);

}
function showmod(modNum) {
	var event = mod[modNum];
	event.marker.openInfoWindow(event.content);

}

function showberk(berkNum) {
	var event = berk[berkNum];
	event.marker.openInfoWindow(event.content);
}

function showparrish(parrishNum) {
	var event = parrish[parrishNum];
	event.marker.openInfoWindow(event.content);
}

function showmenil(menilNum) {
	var event = menil[menilNum];
	event.marker.openInfoWindow(event.content);
}


function setDirections(fromAddress, toAddress) {
gdir.load("from: " + fromAddress + " to: " + toAddress);
}

