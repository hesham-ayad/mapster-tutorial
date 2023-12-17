import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

// latitude, longitude
const map = L.map('map').setView([30.053, 31.223], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// https://leafletjs.com/reference.html#marker
const marker = L.marker([30.053, 31.223])
  .addTo(map)
  .bindPopup('<b>Hello world!</b><br />I am a popup.')
  .openPopup();

// https://leafletjs.com/reference.html#circle
const circle = L.circle([30.053, 31.223], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500,
})
  .addTo(map)
  .bindPopup('I am a circle.');

// https://leafletjs.com/reference.html#circlemarker
const circleMarker = L.circleMarker([30.253, 31.423], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 100,
})
  .addTo(map)
  .bindPopup('I am a circle.');

const polygon = L.polygon([
  [30.353, 31.223],
  [30.553, 31.423],
  [30.753, 31.123],
])
  .addTo(map)
  .bindPopup('I am a polygon.');

const popup = L.popup()
  .setLatLng([30.053, 31.523])
  .setContent('I am a standalone popup.')
  .openOn(map);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.toString()}`)
    .openOn(map);
}

map.on('click', onMapClick);

// geoJSON - very precise point
// {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "coordinates": [
//           31.223743993176782, longitude
//           30.05339705959949 latitude
//         ],
//         "type": "Point"
//       }
//     }
//   ]
// }

// Polyline
// https://leafletjs.com/reference.html#polyline
const latlngs = [
  [-0.10470262429782906, 51.522809059877574],
  [-0.15006226513304455, 51.50678783618662],
  [-0.07650609080744175, 51.482363706445994],
  [-0.08263577200065697, 51.49381414669719],
];

// latlngs.forEach((latlng) => {
//   latlng.reverse();
// });

for (const latlng of latlngs) {
  latlng.reverse();
}

const polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

// Adding as geoJSON
// https://leafletjs.com/reference.html#geojson
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [-0.10470262429782906, 51.522809059877574],
          [-0.15006226513304455, 51.50678783618662],
          [-0.07650609080744175, 51.482363706445994],
          [-0.08263577200065697, 51.49381414669719],
        ],
        type: 'LineString',
      },
    },
  ],
};
// L.geoJSON(geojson).addTo(map)
L.geoJSON(geojson, {
  style: (feature) => {
    return { color: 'red' };
  },
}).addTo(map);
