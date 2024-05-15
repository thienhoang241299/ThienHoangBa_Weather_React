import { applyMiddleware, combineReducers, createStore } from "redux";

import Saga from "redux-saga";
import saSearch from "./saga/saSearch";
import rdcSearch from "./reducer/rdcSearch";
const mySaga = Saga();
const globalState = combineReducers({
  cityManage: rdcSearch,
});

const store = createStore(globalState, applyMiddleware(mySaga));
export default store;
mySaga.run(saSearch);
