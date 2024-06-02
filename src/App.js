import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "6d71dee009534d96921161643242403";

  const fetchData = async () => {
    if (city.trim() === '') return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      const data = await response.json();
      if (data.error) {
        alert("Failed to fetch weather data");
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="search-button"
          onClick={fetchData}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <WeatherCard title="Temperature" value={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" value={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" value={weatherData.current.condition.text} />
          <WeatherCard title="Wind Speed" value={`${weatherData.current.wind_kph} km/h`} />
        </div>
      )}
    </div>
  );
}

export default App;
