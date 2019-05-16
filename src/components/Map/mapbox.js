import mapboxgl from "mapbox-gl";

const zoom = 15;

export const initMap = container => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicHV6YWtvdiIsImEiOiJjanZqanN2cTcwNXJqNGJwaXk3NHo0eXhqIn0.BjCiXQX64qjTjsY9N_BnCw";

  const map = new mapboxgl.Map({
    container: container.current,
    style: "mapbox://styles/mapbox/streets-v10",
    center: [30.2656504, 59.8029126],
    zoom
  });

  return map;
};

export const mapLoadRoute = (map, points) => {
  map.addLayer({
    id: "route-line" + Math.random().toString(36),
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              color: "#F7455D" // red
            },
            geometry: {
              type: "LineString",
              coordinates: points
            }
          }
        ]
      }
    },
    paint: {
      "line-width": 5,
      "line-color": ["get", "color"]
    }
  });
  map.flyTo({ center: points[0], zoom });
};

export const reinitMap = (map, container) => {
  map.remove();
  return initMap(container);
};
