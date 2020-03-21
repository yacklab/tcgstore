import { RouteProps } from "react-router";
import Home from "../../views/home";
import Search from "../../views/search";

interface IAppRoute extends RouteProps {
  path: string;
}

interface IRouteList {
  [routeName: string]: IAppRoute;
}

export const appRoutes: IRouteList = {
  search: {
    path: "/search",
    component: Search
  },
  home: {
    path: "/",
    component: Home
  }
};
