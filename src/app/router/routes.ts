import { RouteProps } from "react-router";
import Home from "../../views/home";
import Search from "../../views/search";
import Details from "../../views/details";

interface IAppRoute extends RouteProps {
  path: string;
  getPath: (param: any) => string;
}

interface IRouteList {
  [routeName: string]: IAppRoute;
}

export const appRoutes: IRouteList = {
  details: {
    path: "/details/:id",
    getPath: (id: string) => `/details/${id}`,
    component: Details
  },
  search: {
    path: "/search",
    getPath: () => `/search`,
    component: Search
  },
  home: {
    path: "/",
    getPath: () => `/`,
    component: Home
  }
};
