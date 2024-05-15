import React from "react";
import { useDispatch } from "react-redux";
import { GET_WEATHER } from "../../../redux/action/actSearch";
import "./Cities.scss";
function Cities(props) {
  const dispatch = useDispatch();
  const HandelClick = () => {
    dispatch({
      type: GET_WEATHER,
      payload: {
        lat: props.data.coord.lat,
        lon: props.data.coord.lon,
        name: props.data.name,
      },
    });
    localStorage.setItem(
      "lastSelected",
      JSON.stringify({
        lat: props.data.coord.lat,
        lon: props.data.coord.lon,
        name: props.data.name,
      })
    );
  };
  return (
    <div className="Cities" onClick={HandelClick}>
      <h4>
        <img src={`https://openweathermap.org/images/flags/${props.data.sys.country.toLowerCase()}.png`} alt="" />
        {" " + props.data.name}
      </h4>
      <p>
        <span>{Math.round(props.data.main.temp / 10)}° C</span> temperature from {Math.round(props.data.main.temp_max / 10)}° to{" "}
        {Math.round(props.data.main.temp_min / 10)}°C
      </p>
      <p>
        Wind {props.data.wind.speed} m/s. clouds {props.data.clouds.all}%
      </p>
      <p>
        Geo coords [{props.data.coord.lat}, {props.data.coord.lon}]
      </p>
    </div>
  );
}

export default React.memo(Cities);
