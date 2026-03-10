import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import Map, { Marker } from "react-map-gl/mapbox";

function App() {
  const [viewState, setViewState] = React.useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Marker
        latitude={48.858093}
        longitude={2.294694}
        color="red"
      />
    </Map>
  );
}

export default App;
