import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { IQuery, ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { SliceStatus, AppError, AppThunk } from "../types";
import { IDetailCard } from "../../../types/app";
import serializeCard from "../../services/serialize-card";

interface ISearchState {
  status: SliceStatus;
  error?: AppError;
  cards: IDetailCard[];
}

const initialState: ISearchState = {
  status: SliceStatus.IDLE,
  error: undefined,
  cards: []
};

export const slice = createSlice({
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

const { setStatus, setCards } = slice.actions;

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
  PokemonTCG.Card.where([...params, { name: "pageSize", value: 10 }]).then(
    res => {
      dispatch(setCards(res));
      dispatch(setStatus(SliceStatus.IDLE));
    }
  );
};

export const selectCards = (state: RootState) => state.searchResults.cards;

export default slice.reducer;
