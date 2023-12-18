import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

maplibregl.setRTLTextPlugin(
  'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
  null,
  true // Lazy load the plugin
);

const map = new maplibregl.Map({
  container: 'map', // container id
  style: {
    version: 8,
    glyphs: '../public/fonts/{fontstack}/{range}.pbf',
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
  zoom: 1.5, // starting zoom
});

// https://maplibre.org/maplibre-gl-js-docs/example/add-a-marker/
const marker = new maplibregl.Marker({
  color: 'red',
})
  .setLngLat([12.550343, 55.665957])
  .addTo(map);

map.on('load', () => {
  // Core idea here: https://maplibre.org/maplibre-gl-js-docs/example/geojson-line/
  // Then for circles https://maplibre.org/maplibre-style-spec/layers/#circle
  map.addSource('our-source', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [31.235726, 30.044386],
          },
        },
      ],
    },
  });

  map.addLayer({
    id: 'our-circle-layer',
    type: 'circle',
    source: 'our-source',
  });

  // Adding some text instead ("symbol")
  // https://maplibre.org/maplibre-style-spec/layers/#symbol
  map.addLayer({
    id: 'our-symbol-layer',
    type: 'symbol',
    source: 'our-source',
    layout: {
      'text-field': 'مرحبا, fag',
      'text-font': ['Noto-Sans-Regular'],
    },
    paint: {
      'text-color': 'red',
    },
  });
});
