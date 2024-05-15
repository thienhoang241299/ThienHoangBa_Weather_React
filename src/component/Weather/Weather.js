import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Weather.scss";
import { GET_WEATHER } from "../../redux/action/actSearch";
export default function Weather() {
  const lsWeather = useSelector((state) => state.cityManage.lsWeather);
  const name = useSelector((state) => state.cityManage.name);
  const [weather, SetWeather] = useState({});
  const dispatch = useDispatch();
  const HandelWeather = (data) => {
    SetWeather(data);
  };
  useEffect(() => {
    if (!lsWeather.current) {
      if (localStorage.getItem("lastSelected")) {
        dispatch({
          type: GET_WEATHER,
          payload: {
            lat: JSON.parse(localStorage.getItem("lastSelected"))?.lat,
            lon: JSON.parse(localStorage.getItem("lastSelected"))?.lon,
            name: JSON.parse(localStorage.getItem("lastSelected"))?.name,
          },
        });
      }
    } else {
      SetWeather(lsWeather.daily[0]);
    }
  }, [lsWeather]);
  return (
    <div className="Weather">
      {lsWeather.current && (
        <>
          <h2>{moment.utc((lsWeather.current?.dt + lsWeather.timezone_offset) * 1000).format(" hh:mm:ss A")}</h2>
          <h4>{moment.utc((lsWeather.current?.dt + lsWeather.timezone_offset) * 1000).format("dddd, DD MMMM, YYYY ")}</h4>
          <h2>Welcome to {name}</h2>
          <div className="daily">
            {lsWeather.daily?.map((v, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    HandelWeather(v);
                  }}
                >
                  <img src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} alt="" />
                  <h3>{moment.utc((v.dt + lsWeather.timezone_offset) * 1000).format("ddd")}</h3>
                  <h4>{Math.round(v.temp.day)}</h4>
                </div>
              );
            })}
          </div>
        </>
      )}

      {weather.dt && (
        <>
          <div>
            <h2>{moment.utc((weather.dt + lsWeather.timezone_offset) * 1000).format("ddd")}</h2>
            <div className="details">
              <div>
                <h4>Sun and Moon</h4>

                <p>Sunrise: {moment.utc((weather.sunrise + lsWeather.timezone_offset) * 1000).format(" hh:mm A")} </p>
                <p>Sunset: {moment.utc((weather.sunset + lsWeather.timezone_offset) * 1000).format(" hh:mm A")} </p>
                <p>Moonrise: {moment.utc((weather.moonrise + lsWeather.timezone_offset) * 1000).format(" hh:mm A")} </p>
                <p>Moonset: {moment.utc((weather.moonset + lsWeather.timezone_offset) * 1000).format(" hh:mm A")} </p>
              </div>
              <div>
                <h4>Temperature</h4>
                <p>Day: {Math.round(weather.temp.day)}°</p>
                <p>Min: {Math.round(weather.temp.min)}°</p>
                <p>Max: {Math.round(weather.temp.max)}°</p>
                <p>Night: {Math.round(weather.temp.night)}°</p>
              </div>
              <div>
                <h4>Feels like</h4>
                <p>Day: {Math.round(weather.feels_like.day)}°</p>
                <p>Night: {Math.round(weather.feels_like.night)}°</p>
                <p>Evening: {Math.round(weather.feels_like.eve)}°</p>
                <p>Morning: {Math.round(weather.feels_like.morn)}°</p>
              </div>
              <div>
                <h4>Other</h4>
                <p>Wind degrees: {weather.wind_deg}°</p>
                <p>Wind speed: {weather.wind_speed} m/s</p>
                <p>Clouds: {weather.clouds}%</p>
                <p>UV: {weather.uvi}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
