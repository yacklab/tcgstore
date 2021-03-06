import React, { useState, useEffect } from "react";
import Filters from "./filter";
import { selectCards, fetchRes } from "../../app/store/slices/search-results";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { useStyles } from "../../app/styles";
import useDeepCompareEffect from "../../hooks/use-deep-compare-effect";
import useSearchParams from "./use-search-params";

import CardDetail from "../../containers/card-detail";
import { useTheme, Box, Grid } from "@material-ui/core";
import { hydrateParamState } from "../../app/store/slices/search-params";
import { appRoutes } from "../../app/router/routes";
import SearchItem from "./search-item";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pagination from "../../containers/pagination";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { useHistory } from "react-router-dom";

const Search = () => {
  const cards = useSelector(selectCards);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const [detailDrawerID, setDetailsDrawer] = useState<null | string>(null);
  const { values: breakPoints } = useTheme().breakpoints;
  const [filterDrawerOpened, setFilterDrawer] = useState(
    window.innerWidth > breakPoints.sm
  );
  const classes = useStyles();

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
          ),
        }}
      >
        <div style={{ position: "absolute", right: 10, top: 0 }}>
          <IconButton
            className={classes.filterDrawerControls}
            onClick={() => setFilterDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
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
          ),
        }}
      >
        {detailDrawerID && (
          <React.Fragment>
            <Box>
              <Grid container direction="row">
                <Grid item>
                  <IconButton onClick={() => setDetailsDrawer(null)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      history.push(appRoutes.details.getPath(detailDrawerID))
                    }
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <CardDetail id={detailDrawerID} />
          </React.Fragment>
        )}
      </Drawer>
      <main className={classes.content}>
        <Button
          color="primary"
          variant="outlined"
          style={{ margin: "8px auto" }}
          className={classes.filterDrawerControls}
          onClick={() => setFilterDrawer(true)}
        >
          Filters
        </Button>
        <div className={classes.resultsWrapper}>
          {cards.map((c) => (
            <SearchItem card={c} key={c.card.id} onClick={setDetailsDrawer} />
          ))}
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Pagination />
        </div>
      </main>
    </div>
  );
};

export default Search;
