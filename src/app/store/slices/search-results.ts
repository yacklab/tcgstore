import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { IQuery, ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { SliceStatus, AppError, AppThunk } from "../types";

interface SearchState {
  status: SliceStatus;
  error?: AppError;
  cards: ICard[];
}

const initialState: SearchState = {
  status: SliceStatus.IDLE,
  error: undefined,
  cards: []
};

export const slice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setStatus: (state: SearchState, action: PayloadAction<SliceStatus>) => {
      state.status = action.payload;
    },
    setCards: (state: SearchState, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    pushCards: (state: SearchState, action: PayloadAction<ICard[]>) => {
      state.cards.push(...action.payload);
    }
  }
});

const { setStatus, setCards } = slice.actions;

export const fetchRes = (params: IQuery[]): AppThunk => (
  dispatch,
  getState
) => {
  const { searchResults } = getState();
  if (searchResults.status === SliceStatus.IDLE) {
    dispatch(setStatus(SliceStatus.LOADING));
    PokemonTCG.Card.where([...params, { name: "pageSize", value: 10 }]).then(
      res => {
        dispatch(setCards(res));
        dispatch(setStatus(SliceStatus.IDLE));
      }
    );
  } else if (process.env.NODE_ENV !== "production") {
    throw new Error("fetchRes called while loading");
  }
};

export const selectCards = (state: RootState) => state.searchResults.cards;

export default slice.reducer;
