import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("!Debes ingresar una ciudad!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        location: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        icon: icon,
      });
      //return data;
    } catch (error) {
      setWeatherData(false);
      console.error("error al capturar los datos");
    }
  };

  useEffect(() => {
    search("Temuco");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search"></input>
        <img
          src={search_icon}
          alt="search-icon"
          onClick={() => search(inputRef.current.value)}
        ></img>
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather-icon"
            className="weather_icon"
          ></img>
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img
                src={humidity_icon}
                alt="humidity-icon"
                className="humidity_icon"
              ></img>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humedad</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind-icon" className="wind_icon"></img>
              <div>
                <p>{weatherData.wind} Km/Hr</p>
                <span>Velocidad</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
