import { Star } from "@mui/icons-material";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { format } from "timeago.js";
import "./app.css";

function App() {
  const currentUser = "john";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewState, setViewState] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      const response = await axios.get("/pins");
      setPins(response.data);
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
    >
      {pins.map((pin) => (
        <>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            color={currentUser === pin.username ? "red" : "blue"}
            onClick={() => handleMarkerClick(pin._id)}
            style={{ cursor: "pointer" }}
          />
          {currentPlaceId === pin._id && (
            <Popup
              latitude={pin.lat}
              longitude={pin.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="desc">{pin.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{pin.username}</b>
                </span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}

export default App;
