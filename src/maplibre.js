import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

// const map = new maplibregl.Map({
//   container: 'map',
//   style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
//   center: [0, 0], // starting position [lng, lat]
//   zoom: 1 // starting zoom
// });

// const map = new maplibregl.Map({
//     container: 'map',
//     style: {
//         version: 8,
//         sources: {
//             MIERUNEMAP: {
//                 type: 'raster',
//                 tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
//                 tileSize: 256,
//                 attribution:
//                     "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
//             },
//         },
//         layers: [
//             {
//                 id: 'MIERUNEMAP',
//                 type: 'raster',
//                 source: 'MIERUNEMAP',
//                 minzoom: 0,
//                 maxzoom: 18,
//             },
//         ],
//     },
//     center: [139.767, 35.681],
//     zoom: 11,
// });

// https://maplibre.org/maplibre-gl-js-docs/example/map-tiles/
const map = new maplibregl.Map({
  container: 'map', // container id
  style: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  center: [0, 0], // starting position
  zoom: 1, // starting zoom
});

// Maptiler
// https://cloud.maptiler.com/maps/basic-v2/
// const map = new maplibregl.Map({
//   container: 'map', // container id
//   style: "https://api.maptiler.com/maps/basic-v2/style.json?key=mkQnG7lesIRZYYnwOLiz",
//   center: [-74.5, 40], // starting position
//   zoom: 2 // starting zoom
// });
