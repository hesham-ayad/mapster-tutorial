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
    glyphs: '/fonts/{fontstack}/{range}.pbf',
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

  // Adding a line
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        // san francisco
        coordinates: [
          [-122.48369693756104, 37.83381888486939],
          [-122.48348236083984, 37.83317489144141],
          [-122.48339653015138, 37.83270036637107],
          [-122.48356819152832, 37.832056363179625],
          [-122.48404026031496, 37.83114119107971],
          [-122.48404026031496, 37.83049717427869],
          [-122.48348236083984, 37.829920943955045],
          [-122.48356819152832, 37.82954808664175],
          [-122.48507022857666, 37.82944639795659],
          [-122.48610019683838, 37.82880236636284],
          [-122.48695850372314, 37.82931081282506],
          [-122.48700141906738, 37.83080223556934],
          [-122.48751640319824, 37.83168351665737],
          [-122.48803138732912, 37.832158048267786],
          [-122.48888969421387, 37.83297152392784],
          [-122.48987674713133, 37.83263257682617],
          [-122.49043464660643, 37.832937629287755],
          [-122.49125003814696, 37.832429207817725],
          [-122.49163627624512, 37.832564787218985],
          [-122.49223709106445, 37.83337825839438],
          [-122.49378204345702, 37.83368330777276],
        ],
      },
    },
  });

  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#FF0000',
      'line-width': 8,
    },
  });

  //Adding two polygons
  map.addSource('polygon-src', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            // near marker
            coordinates: [
              [12.561403078426281, 55.69389010204304],
              [12.592895674583048, 55.665987808040114],
              [12.61389073868662, 55.67444515062988],
            ],
            type: 'LineString',
          },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            // Friedland - north Berlin, Germany
            coordinates: [
              [
                [13.578028050588586, 53.69645032403699],
                [13.569011348337966, 53.67823698699681],
                [13.599067022505864, 53.6676439373351],
                [13.614094859589812, 53.68416784207838],
                [13.578028050588586, 53.69645032403699],
              ],
            ],
            type: 'Polygon',
          },
        },
      ],
    },
  });

  map.addLayer({
    id: 'our-fill-layer',
    type: 'fill',
    source: 'polygon-src',
    paint: {
      'fill-color': '#FF0000',
      'fill-opacity': 0.5,
    },
  });

  map.addControl(
    new maplibregl.NavigationControl({
      visualizePitch: true,
    })
  );
});
