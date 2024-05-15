import React from "react";

import "./App.scss";
import Search from "./component/Search/Search";
import Weather from "./component/Weather/Weather";
export default function App() {
  return (
    <div className="App">
      <Search />
      <Weather />
    </div>
  );
}
