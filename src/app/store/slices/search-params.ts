import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceStatus } from "../types";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { history } from "../../router";
import { RootState } from "..";
import { queryToHistoryObject } from "../../../views/search/use-search-params";

type StateSearchParams = { [key: string]: string | number };

interface ISearchParams {
  status: SliceStatus;
  params: StateSearchParams;
}

const initialState: ISearchParams = {
  status: SliceStatus.IDLE,
  params: {}
};

function stateToQuery(state: ISearchParams): IQuery[] {
  let query: IQuery[] = [];
  for (const key in state.params) {
    if (state.params.hasOwnProperty(key)) {
      const q: IQuery = { name: key, value: state.params[key] };
      query.push(q);
    }
  }
  return query;
}

function urlReplace(params: IQuery[]) {
  history.replace(queryToHistoryObject(params));
}

export const slice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    hydrateParamState: (
      state: ISearchParams,
      action: PayloadAction<IQuery[]>
    ) => {
      action.payload.forEach(query => {
        state.params[query.name] = query.value;
      });
    },
    setSearchParam: (state: ISearchParams, action: PayloadAction<IQuery>) => {
      if (
        typeof action.payload.value === "string" &&
        action.payload.value.length === 0
      ) {
        delete state.params[action.payload.name]; // helo
      } else {
        state.params[action.payload.name] = action.payload.value;
      }
      urlReplace(stateToQuery(state));
    }
  }
});

export const { setSearchParam, hydrateParamState } = slice.actions;

export const selectParams = (state: RootState) => state.searchParams.params;

export default slice.reducer;
