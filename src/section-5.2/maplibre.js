import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

const popUpElement = document.createElement('div');
popUpElement.textContent = 'i am a pop up';

const polygonGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Big Square',
      },
      geometry: {
        coordinates: [
          [
            [-103.16190973856989, 43.69530791770973],
            [-103.16190973856989, 36.40609683120665],
            [-92.9706873438928, 36.40609683120665],
            [-92.9706873438928, 43.69530791770973],
            [-103.16190973856989, 43.69530791770973],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Little Square',
      },
      geometry: {
        coordinates: [
          [
            [-119.32673977103425, 46.86239781188169],
            [-119.32673977103425, 42.576775948771456],
            [-112.81770269608896, 42.576775948771456],
            [-112.81770269608896, 46.86239781188169],
            [-119.32673977103425, 46.86239781188169],
          ],
        ],
        type: 'Polygon',
      },
    },
  ],
};

maplibregl.setRTLTextPlugin(
  'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
  null,
  true
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
  center: [0, 0],
  zoom: 1.5,
});

const popup = new maplibregl.Popup({ closeOnClick: false });

map.on('load', () => {
  map.addSource('polygon', {
    type: 'geojson',
    data: polygonGeoJSON,
  });

  map.addLayer({
    id: 'polygon-layer',
    type: 'fill',
    source: 'polygon',
  });

  // map.on('click', 'polygon-layer', (e) => {
  //   // console.log(e);
  //   // https://maplibre.org/maplibre-gl-js-docs/example/queryrenderedfeatures/
  //   // https://maplibre.org/maplibre-gl-js-docs/api/map/#map#queryrenderedfeatures
  //   // console.log(map.queryRenderedFeatures(e.point));
  //   const features = map.queryRenderedFeatures(e.point);
  //   // console.log(features);
  //   if (features.length > 0) {
  //     // console.log("hi");
  //     popup
  //       .setLngLat(e.lngLat)
  //       .setHTML(`You clicked the polygon named ${features[0].properties.name}`)
  //       .addTo(map);
  //   }
  // });

  map.on('click', (e) => {
    popup
      .setLngLat(e.lngLat)
      .setHTML(`You clicked the polygon named ${e.lngLat.toString()}`)
      .addTo(map);
  });
});
