// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with center at the San Francisco airport.
// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);



 // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});    

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
  // We set the style for each circleMarker using our styleInfo function.
style: styleInfo,
  // We create a popup for each circleMarker to display the magnitude and
  //  location of the earthquake after the marker has been created and styled.
  onEachFeature: function(feature, layer) {
  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
}
}).addTo(map);