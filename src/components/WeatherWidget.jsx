import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../services/apiServices";

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock interval
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "MOCK_KEY";
    const defaultCity = "New Delhi";

    const getWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrentWeather(defaultCity, apiKey);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load weather details:", err);
        setError("Unable to load weather.");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  // Date and Time Formatting to match screenshot (M-D-YYYY and hh:mm AM/PM)
  const formatDate = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return `${m}-${d}-${y}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = String(hours).padStart(2, '0');
    const strMinutes = String(minutes).padStart(2, '0');
    return `${strHours}:${strMinutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="weather-widget dashboard-card" style={{ justifyContent: "center", alignItems: "center", minHeight: "180px", color: "var(--text-secondary)" }}>
        <p>Loading weather details...</p>
      </div>
    );
  }

  const temp = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : "24";
  const humidity = weatherData?.main?.humidity ?? "83";
  const pressure = weatherData?.main?.pressure ?? "1010";
  const windSpeed = weatherData?.wind?.speed ?? "3.7";
  const desc = weatherData?.weather?.[0]?.description ?? "Heavy rain";

  return (
    <div className="weather-widget dashboard-card">
      <div className="weather-header">
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="weather-body">
        {error ? (
          <p style={{ color: "var(--color-error)", fontSize: "0.85rem" }}>{error}</p>
        ) : (
          <>
            {/* Column 1: Condition details */}
            <div className="weather-col weather-col-condition">
              <svg className="weather-condition-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                {/* Cloud with lightning outline */}
                <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 8.58" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m13 15-3 5h4l-3 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="weather-condition-text">{desc}</span>
            </div>
            
            <div className="weather-separator"></div>
            
            {/* Column 2: Temperature & Pressure */}
            <div className="weather-col weather-col-temp">
              <span className="weather-temp">{temp}°C</span>
              <div className="weather-temp-divider"></div>
              <div className="weather-pressure-row">
                <svg className="weather-pressure-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {/* Thermometer / Pressure gauge */}
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
                <span className="weather-pressure-text">{pressure} mbar Pressure</span>
              </div>
            </div>
            
            <div className="weather-separator"></div>
            
            {/* Column 3: Wind & Humidity */}
            <div className="weather-col weather-col-stats">
              <div className="weather-stat-row">
                <svg className="weather-stat-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {/* Wind lines */}
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="weather-stat-val">{windSpeed} km/h Wind</span>
              </div>
              <div className="weather-stat-row">
                <svg className="weather-stat-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {/* Water droplet */}
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="weather-stat-val">{humidity}% Humidity</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
