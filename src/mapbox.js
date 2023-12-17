mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwc3RlcnRlY2giLCJhIjoiY2w5bjZxYWcyMDB0ajN1bzdranRpeWJsaCJ9.U2iH1idT-YJNJlD-nKuQGg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
