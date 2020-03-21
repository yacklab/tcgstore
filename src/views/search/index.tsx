import React, { useEffect } from "react";
import Filters from "./filter";
import { selectCards, fetchRes } from "../../app/store/slices/search-results";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRes([]));
  }, []);
  return (
    <React.Fragment>
      <Filters />
      <div
        style={{
          minHeight: "100vh",
          width: "calc(100vw - 300px)",
          marginLeft: "300px"
        }}
      >
        <h3>res</h3>
        {cards.map(c => {
          return <div key={c.id}>{c.name}</div>;
        })}
      </div>
    </React.Fragment>
  );
};

export default Search;
