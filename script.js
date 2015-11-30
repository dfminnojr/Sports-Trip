var map;
var service;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var stepDisplay;
var markerArray = [];
var markers = [];
var infowindow;
var NflHq;
var stadium;
var stad;
var stadLoc;
var middle;

function initialize() {
  UScenter = new google.maps.LatLng(39.8282, -98.5795);
  directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
    center: UScenter,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var rendererOptions = {
    map: map,
  }
   directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    stepDisplay = new google.maps.InfoWindow();
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

}

function chooseThing(){
  var thing = document.getElementById("thing").value;
  stad = document.getElementById("stadium").value;
  stadLoc = stad.split(',');
    var request = {
      location: new google.maps.LatLng(stadLoc[0],stadLoc[1]), 
      radius: '1000',
      query: [thing]
  }
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function clearThings() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers = [];
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent("<div id='infowindow'> <center>" + "<h3 style='font-family: freshman; color:blue;'>" + place.name + "</h3></center>" + place.formatted_address + "<br><br>" + "<center><button id='rest' value='" + place.formatted_address + "' onclick='calcRoute2();' >Take me to the Stadium!</button></center></div>");
    infowindow.open(map, this);
  });
}

function calcRoute() {
  var start = document.getElementById("start").value;
  stadium = document.getElementById("stadium").value;
  var request = {
    origin:start,
    destination: stadium,
    travelMode: google.maps.TravelMode.DRIVING
  };
 directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      // showSteps(response);
    }
  });
}

function calcRoute2() {
  var rest = document.getElementById("rest").value;
  // var end = document.getElementById("end").value;
  var stadium = document.getElementById("stadium").value;
  var request = {
    origin:rest,
    destination:stadium,
    travelMode: google.maps.TravelMode.DRIVING
  };
 directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      // showSteps(response);
    }
  });
 infowindow.close();
 clearThings();
}

// * ADDS STEP BY STEP DIRECTION MARKERS ON MAP
// function showSteps(directionResult) {
//   var myRoute = directionResult.routes[0].legs[0];

//   for (var i = 0; i < myRoute.steps.length; i++) {
//       var marker = new google.maps.Marker({
//         position: myRoute.steps[i].start_point,
//         map: map
//       });
//       attachInstructionText(marker, myRoute.steps[i].instructions);
//       markerArray[i] = marker;
//   }
// }

google.maps.event.addDomListener(window, 'load', initialize);


