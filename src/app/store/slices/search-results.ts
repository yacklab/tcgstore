import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./root-reducer";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { IQuery, ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { SliceStatus, AppError, AppThunk } from "../types";
import { IDetailCard } from "../../../types/app";
import serializeCard from "../../services/serialize-card";
import getDefaultPageSize from "../../services/get-default-page-size";

export interface ISearchState {
  status: SliceStatus;
  error?: AppError;
  cards: IDetailCard[];
}

const initialState: ISearchState = {
  status: SliceStatus.IDLE,
  error: undefined,
  cards: []
};

const PAGE_SIZE = getDefaultPageSize();

export const searchResultSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setStatus: (state: ISearchState, action: PayloadAction<SliceStatus>) => {
      state.status = action.payload;
    },
    setCards: (state: ISearchState, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload.map(serializeCard);
    },
    pushCards: (state: ISearchState, action: PayloadAction<ICard[]>) => {
      state.cards.push(...action.payload.map(serializeCard));
    }
  }
});

const { setStatus, setCards } = searchResultSlice.actions;

export const fetchRes = (params: IQuery[]): AppThunk => (
  dispatch,
  getState
) => {
  const { searchResults } = getState();
  if (
    process.env.NODE_ENV !== "production" &&
    searchResults.status !== SliceStatus.IDLE
  ) {
    console.error("fetchRes called while loading");
  }
  dispatch(setStatus(SliceStatus.LOADING));
  PokemonTCG.Card.where([
    ...params,
    { name: "pageSize", value: PAGE_SIZE }
  ]).then(res => {
    dispatch(setCards(res));
    if (res.length > 0) {
      dispatch(setStatus(SliceStatus.IDLE));
    } else {
      dispatch(setStatus(SliceStatus.EMPTY));
    }
  });
};

export const selectCards = (state: RootState) => state.searchResults.cards;
export const selectStatus = (state: RootState) => state.searchResults.status;

export default searchResultSlice.reducer;
