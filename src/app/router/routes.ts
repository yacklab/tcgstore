import { RouteProps } from "react-router";
import Home from "../../views/home";
import Search from "../../views/search";
import Details from "../../views/details";
import Basket from "../../views/basket";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { queryToHistoryObject } from "../../views/search/use-search-params";

interface IAppRoute extends RouteProps {
  path: string;
  getPath: (param: any) => string;
}

interface IRouteList {
  [routeName: string]: IAppRoute;
}

export const appRoutes: IRouteList = {
  basket: {
    path: "/basket",
    getPath: () => `/basket`,
    component: Basket
  },
  details: {
    path: "/details/:id",
    getPath: (id: string) => `/details/${id}`,
    component: Details
  },
  search: {
    path: "/search",
    getPath: (params: IQuery[]) =>
      `/search${queryToHistoryObject(params).search}`,
    component: Search
  },
  home: {
    path: "/",
    getPath: () => `/`,
    component: Home
  }
};
