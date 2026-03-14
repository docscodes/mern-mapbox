import { Star } from "@mui/icons-material";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "./app.css";

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
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Marker
        latitude={48.858093}
        longitude={2.294694}
        color="red"
      />
      <Popup
        latitude={48.858093}
        longitude={2.294694}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
      >
        <div className="card">
          <label>Place</label>
          <h4 className="place">Eiffell Tower</h4>
          <label>Review</label>
          <p className="desc">Beautiful place. I like it.</p>
          <label>Rating</label>
          <div className="stars">
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
          </div>
          <label>Information</label>
          <span className="username">
            Created by <b>John Doe</b>
          </span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup>
    </Map>
  );
}

export default App;
