import { useLocation } from "react-router";
import { parse } from "qs";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";

const urlToIQuery = (string: string): IQuery[] => {
  const res = parse(string, {
    plainObjects: true,
    ignoreQueryPrefix: true,
    parseArrays: true
  });
  return res.params || [];
};

export default function useSearchParams() {
  const location = useLocation();
  return urlToIQuery(location.search);
}
