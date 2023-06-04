import React, { useState } from 'react';
import './App.css';

const token = 'fed67fa88363f1ae5a07d312ce06eb0517fd7f37';

function App() {
  const [city, setCity] = useState('');
  const [aqi, setAqi] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [heading, setHeading] = useState('');
  const [message, setMessage] = useState('');

  const fetchAirQuality = async () => {
    try {
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${token}`);
      const data = await response.json();
      setAqi(data.data.aqi);
      setBackgroundColor(getBackgroundColor(data.data.aqi));
      setHeading(getHeading(data.data.aqi));
      setMessage(getMessage(data.data.aqi));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchAirQuality();
    }
  };

  const getBackgroundColor = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'green';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'yellow';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'orange';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'red';
    } else if (aqi >= 201 && aqi <= 300) {
      return 'purple';
    } else {
      return 'maroon';
    }
  };

  const getHeading = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'Good air';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'Moderate';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'Unhealthy';
    } else if (aqi >= 201 && aqi <= 300) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  };

  const getMessage = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
    } else if (aqi >= 201 && aqi <= 300) {
      return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    } else {
      return 'Health alert: everyone may experience more serious health effects.';
    }
  };

  return (
    <div className="container" style={{ backgroundColor }}>
      <h1>Airnow</h1>
      <input
      type="text"
      placeholder="Enter a city"
      value={city}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
      <button onClick={fetchAirQuality}>Search</button>
      {aqi && (
        <div id="result">
          <h2>{heading}</h2>
          <p>City: {city}</p>
          <p>AQI: {aqi}</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
