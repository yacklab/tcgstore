import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { map } from "lodash";
import AppHeader from "../../containers/app-header";
import { useStyles } from "../styles";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const AppRouter = () => {
  const classes = useStyles();
  return (
    <Router history={history}>
      <AppHeader />
      <div className={classes.appBarSpacer} />
      <Switch>
        {map(appRoutes, (r, index) => (
          <Route key={index} {...r} />
        ))}
      </Switch>
    </Router>
  );
};

export default AppRouter;
