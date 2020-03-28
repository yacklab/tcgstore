import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceStatus } from "../types";
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { stringify } from "qs";
import { history } from "../../router";
import { RootState } from "..";

interface ISearchParams {
  status: SliceStatus;
  params: {
    [key: string]: string | number;
  };
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

function setUrl(params: IQuery[]) {
  history.replace({
    pathname: "/search",
    search: stringify(
      { params: params },
      {
        addQueryPrefix: true,
        format: "RFC3986"
      }
    )
  });
}

export const slice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    setSearchParam: (state: ISearchParams, action: PayloadAction<IQuery>) => {
      if (
        typeof action.payload.value === "string" &&
        action.payload.value.length === 0
      ) {
        delete state.params[action.payload.name];
      } else {
        state.params[action.payload.name] = action.payload.value;
      }
      setUrl(stateToQuery(state));
    }
  }
});

export const { setSearchParam } = slice.actions;

export const selectParams = (state: RootState) => state.searchParams.params;

export default slice.reducer;
