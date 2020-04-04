import React, { useState, useEffect } from "react";
import Filters from "./filter";
import { selectCards, fetchRes } from "../../app/store/slices/search-results";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useStyles } from "../../app/styles";
import useDeepCompareEffect from "../../hooks/use-deep-compare-effect";
import useSearchParams from "./use-search-params";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardDetail from "../../containers/card-detail";
import { useTheme } from "@material-ui/core";
import { addToBaket } from "../../app/store/slices/basket";
import { hydrateParamState } from "../../app/store/slices/search-params";
import { appRoutes } from "../../app/router/routes";
import { Link } from "react-router-dom";

const Search = () => {
  const classes = useStyles();
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();
  const params = useSearchParams();
  const [filterDrawerOpened, setFilterDrawer] = useState(true);
  const [detailDrawerID, setDetailsDrawer] = useState<null | string>(null);
  const { values: breakPoints } = useTheme().breakpoints;

  useDeepCompareEffect(() => {
    dispatch(hydrateParamState(params));
    dispatch(fetchRes(params));
  }, [params]);

  useEffect(() => {
    const resizelistener = () => {
      if (window.innerWidth > breakPoints.sm && !filterDrawerOpened) {
        setFilterDrawer(true);
      }
    };
    window.addEventListener("resize", resizelistener);
    return () => window.removeEventListener("resize", resizelistener);
  }, [filterDrawerOpened, setFilterDrawer, breakPoints.sm]);

  return (
    <div>
      <Drawer
        variant="permanent"
        open={filterDrawerOpened}
        classes={{
          paper: clsx(
            classes.filterDrawerPaper,
            !filterDrawerOpened && classes.filterDrawerPaperClose
          )
        }}
      >
        <div style={{ position: "absolute", right: 10, top: 0 }}>
          <button onClick={() => setFilterDrawer(false)}>hide</button>
        </div>
        <Filters />
      </Drawer>
      <Drawer
        anchor="right"
        variant="temporary"
        open={!!detailDrawerID}
        onClose={() => setDetailsDrawer(null)}
        classes={{
          paper: clsx(
            classes.detailsDrawerPaper,
            !detailDrawerID && classes.detailsDrawerPaperClose
          )
        }}
      >
        {detailDrawerID && (
          <React.Fragment>
            <Link to={appRoutes.details.getPath(detailDrawerID)}>go</Link>
            <CardDetail id={detailDrawerID} />
          </React.Fragment>
        )}
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
          <button onClick={() => setFilterDrawer(true)}>show</button>
        </div>
        <h3>res</h3>
        <div className={classes.resultsWrapper}>
          {cards.map(c => {
            return (
              <Paper
                onClick={() => {
                  setDetailsDrawer(c.card.id);
                }}
                className={classes.cardItem}
                key={c.card.id}
                elevation={0}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Avatar
                    className={classes.itemAvatar}
                    variant="rounded"
                    src={c.card.imageUrl}
                  />
                  <Typography variant="h6" component="h6">
                    {c.card.name}
                    {c.price.tag}
                  </Typography>
                </div>
                <div>{c.card.types}</div>
                <div>{c.card.series}</div>
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(addToBaket({ id: c.card.id }));
                  }}
                >
                  add
                </Button>
              </Paper>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Search;
