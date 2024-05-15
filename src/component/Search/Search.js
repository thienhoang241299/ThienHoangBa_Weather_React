import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CITY } from "../../redux/action/actSearch";

import "./Search.scss";
import Cities from "./Cities/Cities";
function Search() {
  const dispatch = useDispatch();
  const cityManage = useSelector((state) => state.cityManage);
  const HandelSearch = (e) => {
    if (e.keyCode === 13) {
      dispatch({
        type: GET_CITY,
        payload: e.target.value,
      });
    }
  };
  return (
    <div className="Search">
      <input type="text" placeholder="Search . . ." onKeyUp={HandelSearch} />
      <br />
      <p>
        <label htmlFor="">Enter to Search.</label>
      </p>
      <div className="cities">
        {cityManage.lsCity.map((v, i) => {
          return <Cities data={v} key={i} />;
        })}
      </div>
    </div>
  );
}

export default React.memo(Search);
