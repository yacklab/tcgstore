import { useLocation } from "react-router";
import { parse, stringify } from "qs";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { appRoutes } from "../../app/router/routes";

const urlToIQuery = (string: string): IQuery[] => {
  const res = parse(string, {
    ignoreQueryPrefix: true,
    parseArrays: true
  }) as { params: IQuery[] };
  const params = res.params;
  return params
    ? params.map(q => {
        if (typeof q.value === "number") return q;
        let converted = parseInt(q.value, 10);
        if (isNaN(converted)) {
          return q;
        } else {
          return { ...q, value: converted };
        }
      })
    : [];
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
