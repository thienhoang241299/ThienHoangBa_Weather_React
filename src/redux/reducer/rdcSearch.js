import { SET_CITY, SET_WEATHER } from "../action/actSearch";

const initialState = {
  lsCity: [],
  lsWeather: [],
  name: "",
};
const rdcSearch = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CITY:
      return {
        ...state,
        lsCity: payload.list,
      };
    case SET_WEATHER:
      console.log(123);
      return {
        ...state,
        lsWeather: payload.data,
        name: payload.name,
      };
    default:
      return state;
  }
};
export default rdcSearch;
