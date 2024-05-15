import { call, put, takeEvery } from "redux-saga/effects";
import { GET_CITY, GET_WEATHER, SET_CITY, SET_WEATHER } from "../action/actSearch";
const key = `439d4b804bc8187953eb36d2a8c26a02`;
async function CallCity(keySearch) {
  const res = await fetch(`https://openweathermap.org/data/2.5/find?q=${keySearch}&appid=${key}`);
  const data = await res.json();
  return data;
}
function* GetCity({ type, payload }) {
  
  let dt = yield call(CallCity, payload);
  yield put({
    type: SET_CITY,
    payload: dt,
  });
}
async function CallWeather(lat, lon) {
  const res = await fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`);
  const data = await res.json();
  return data;
}
function* GetWeather({ type, payload }) {
  let dt = yield call(CallWeather, payload.lat, payload.lon);
  yield put({
    type: SET_WEATHER,
    payload: {
      data: dt,
      name: payload.name,
    },
  });
}
function* saSearch() {
  yield takeEvery(GET_CITY, GetCity);
  yield takeEvery(GET_WEATHER, GetWeather);
}
export default saSearch;
