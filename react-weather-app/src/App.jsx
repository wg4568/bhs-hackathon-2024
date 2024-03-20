import React, { useEffect, useState } from "react";
import "./App.css";

function getWeatherInfo(lat, long) {
    var url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max`;
    return fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            var weatherData = [];

            for (let i = 0; i < data.daily.time.length; i++) {
                weatherData.push({
                    time: data.daily.time[i],
                    temperature: data.daily.temperature_2m_max[i],
                });
            }

            return weatherData;
        });
}

function WeatherInfo(props) {
    return (
        <div className="weather">
            {props.data.map((data, idx) => (
                <div key={idx}>
                    <p>{data.time}</p>
                    <p>{data.temperature}°</p>
                </div>
            ))}
        </div>
    );
}

export default function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        getWeatherInfo(lat, long).then((data) => {
            setWeatherData(data);
        });
    }, [lat, long]);

    return (
        <main>
            <h1>Weather Checker</h1>

            <div className="input">
                <p>Latitude</p>
                <input
                    placeholder="Latitude"
                    onChange={(event) => setLat(event.target.value)}
                />
            </div>

            <div className="input">
                <p>Longitude</p>
                <input
                    placeholder="Longitude"
                    onChange={(event) => setLong(event.target.value)}
                />
            </div>

            <WeatherInfo data={weatherData} />
        </main>
    );
}
