var map;
var geocoder;


  function init() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.741895, lng: -73.989308},
      zoom: 2,
      mapTypeId: 'roadmap'
    });


    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log('head');

    map.data.setStyle(function(feature) {
      var magnitude = feature.getProperty('mag');
      return {
        icon: getCircle(magnitude)
      };
    });
	
	var location_text = prompt("Please enter your address", "New Jersey"); // defaults to New Jersey
	console.log(location_text);
	
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': location_text}, function(results, status) {
	  if (status == 'OK') {
		map.setCenter(results[0].geometry.location);
		var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location
		// map.data.addGeoJson(results);
		});
	  } else {
		alert('Geocode was not successful: ' + status);
	  }
	});
  }

function getCircle(magnitude) {
return {
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: 'red',
  fillOpacity: .2,
  scale: Math.pow(2, magnitude) / 2,
  strokeColor: 'white',
  strokeWeight: .5
};
}

function eqfeed_callback(results) {
map.data.addGeoJson(results);
}