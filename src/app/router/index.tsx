import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { map } from "lodash";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        {map(appRoutes, (r, index) => (
          <Route key={index} {...r} />
        ))}
      </Switch>
    </Router>
  );
};

export default AppRouter;
