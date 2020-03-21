import React, { useEffect, useState } from "react";
import Filters from "./filter";
import { selectCards, fetchRes } from "../../app/store/slices/search-results";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";

import clsx from "clsx";
import { useStyles } from "../../app/styles";

const Search = () => {
  const classes = useStyles();
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawer] = useState(true);

  useEffect(() => {
    dispatch(fetchRes([]));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          )
        }}
      >
        <div style={{ position: "absolute", right: 10, top: 0 }}>
          <button onClick={() => setDrawer(false)}>hide</button>
        </div>
        <Filters />
      </Drawer>
      <main className={classes.content}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            left: 0,
            textAlign: "center"
          }}
        >
          <button onClick={() => setDrawer(true)}>show</button>
        </div>
        <h3>res</h3>
        {cards.map(c => {
          return <div key={c.id}>{c.name}</div>;
        })}
      </main>
    </React.Fragment>
  );
};

export default Search;
