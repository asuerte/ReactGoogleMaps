import GoogleMap from "./GoogleMap"
import LocationDetails from "./LocationDetails"
import axios from "axios";
import { useState } from 'react';
import './styles/App.css';

function App() {
  const [details, setDetails] = useState({})

  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  })

  const addCoords = (lat, lng) => {
    setCoords({
      lat: lat,
      lng: lng,
    })
  }

  const getDetails = async () => {
    const BACKEND_URI = "http://localhost:8080"

    try {
      const { data } = await axios.get(`${BACKEND_URI}/detail?lat=${coords.lat}&lng=${coords.lng}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*'
        }
      })
      setDetails(data)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="App">
      <h1>Google Maps On React.JS</h1>
      <GoogleMap onAdd={addCoords} getDetails={getDetails} details={details} />
      {Object.entries(details).length !== 0 && <LocationDetails details={details} />}
    </div>
  );
}

export default App;