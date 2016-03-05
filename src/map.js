var map, lat, long, homeMarker, homeListener, finalMarker, finalListener;

function initMap() {
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locatePosition, function() {
            createMap();
        });
    } else {
        createMap();
    }
}

function locatePosition(position) {
    createMap(position.coords.latitude, position.coords.longitude);
}

function createMap(lat, long) {
    if (!lat) {
        latitude = 39.290385;
    } else {
        latitude = lat;
    }
    if (!long) {
        longitude = -76.612189;
    } else {
        longitude = long;
    }

    var newMap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: latitude,
            lng: longitude
        },
        scrollwheel: true,
        zoom: 15
    });
    map = newMap;
    homeMarker = createMarker(map.center.lat(), map.center.lng());
    finalListener = map.addListener("click", setFinal, false);
}

function createMarker(lat, long) {
    var mark = new google.maps.Marker({
        position: {
            lat: lat,
            lng: long
        },
        map: map,
        draggable: true
    });
    return mark;
}

function setNewHome(e) {
    homeMarker.setMap(null); // Removes marker from map
    homeMarker = createMarker(e.latLng.lat(), e.latLng.lng());
    homeListener.remove();
}

function setFinal(e) {
  finalMarker = createMarker(e.latLng.lat(), e.latLng.lng());
  finalListener.remove();
}

function setNewFinal(e) {
  setFinal(e)
  finalMarker.setMap(null);
}

function listenForChanges(name) {
    if (name === "home") {
        homeListener = map.addListener("click", setNewHome, false);
    } else {
        finalListener = map.addListener("click", setNewFinal, false);
    }
}
