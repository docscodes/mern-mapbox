import { Star } from "@mui/icons-material";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { format } from "timeago.js";
import "./app.css";
import Register from "./components/Register";

function App() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const title = useRef(null);
  const desc = useRef(null);
  const star = useRef(0);

  const [viewState, setViewState] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 2,
  });

  useEffect(() => {
    const getPins = async () => {
      const response = await axios.get("/pins");
      setPins(response.data);
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat: lat,
      long: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title: title.current.value,
      desc: desc.current.value,
      rating: star.current.value,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    console.log(newPin);

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      onDblClick={handleAddClick}
      transitionDuratoin="200"
    >
      {pins.map((pin) => (
        <div key={pin._id}>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            color={currentUsername === pin.username ? "tomato" : "slateblue"}
            onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
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
                <div className="stars">{Array(pin.rating).fill(<Star className="star" />)}</div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{pin.username}</b>
                </span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </div>
      ))}

      {newPlace && (
        <>
          <Marker
            latitude={newPlace.lat}
            longitude={newPlace.long}
          ></Marker>
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  ref={title}
                />
                <label>Description</label>
                <textarea
                  placeholder="Tell us something about this place."
                  ref={desc}
                />
                <label>Rating</label>
                <select ref={star}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="submit"
                  className="submitButton"
                >
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        </>
      )}

      {currentUsername ? (
        <button className="button logout">Logout</button>
      ) : (
        <div className="buttons">
          <button
            className="button login"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}

      {showRegister && <Register setShowRegister={setShowRegister} />}
    </Map>
  );
}

export default App;
