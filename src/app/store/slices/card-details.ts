import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { SliceStatus, AppThunk } from "../types";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { RootState } from "./root-reducer";
import makePrice from "../../services/make-price";
import { IDetailCard } from "../../../types/app";
import { searchResultSlice } from "./search-results";

export interface ICardDetailState {
  [key: string]: IDetailCard;
}

const initialState: ICardDetailState = {};

export const slice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {
    setCard: (state: ICardDetailState, action: PayloadAction<ICard>) => {
      const { id } = action.payload;
      state[id] = {
        price: makePrice(action.payload),
        status: SliceStatus.IDLE,
        card: action.payload
      };
    }
  },
  extraReducers: {
    [searchResultSlice.actions.setCards.toString()]: (
      state: ICardDetailState,
      action: PayloadAction<ICard[]>
    ) => {
      action.payload.forEach(card => {
        const { id } = card;
        state[id] = {
          price: makePrice(card),
          status: SliceStatus.IDLE,
          card
        };
      });
    }
  }
});

const { setCard } = slice.actions;

export const fetchCard = (id: string): AppThunk => (dispatch, getState) => {
  const cardDetailsStore = getState().cardDetails;
  if (!cardDetailsStore[id]) {
    PokemonTCG.Card.find(id).then(card => {
      dispatch(setCard(card));
    });
  }
};

export const selectCardDetail = (id: string) => (state: RootState) =>
  state.cardDetails[id] || { status: SliceStatus.EMPTY };

export default slice.reducer;
