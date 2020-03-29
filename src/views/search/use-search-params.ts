import { useLocation } from "react-router";
import { parse, stringify } from "qs";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { appRoutes } from "../../app/router/routes";

const urlToIQuery = (string: string): IQuery[] => {
  const res = parse(string, {
    ignoreQueryPrefix: true,
    parseArrays: true
  });
  return res.params || [];
};

export const queryToHistoryObject = (params: IQuery[]) => {
  return {
    pathname: appRoutes.search.path,
    search: stringify(
      { params },
      {
        encodeValuesOnly: true,
        addQueryPrefix: true,
        format: "RFC3986"
      }
    )
  };
};

export default function useSearchParams() {
  const location = useLocation();
  return urlToIQuery(location.search);
}
