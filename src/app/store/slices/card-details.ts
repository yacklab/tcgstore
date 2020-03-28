import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, Card } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { SliceStatus, AppThunk } from "../types";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { RootState } from "..";

interface IDetailCard {
  status: SliceStatus;
  card: ICard;
}

interface ICardDetailState {
  [key: string]: IDetailCard;
}

const initialState: ICardDetailState = {};

export const slice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {
    setCard: (state: ICardDetailState, action: PayloadAction<Card>) => {
      const { id } = action.payload;
      state[id] = {
        status: SliceStatus.IDLE,
        card: action.payload
      };
    }
  }
});

const { setCard } = slice.actions;

export const fetchCard = (id: string): AppThunk => (dispatch, getState) => {
  PokemonTCG.Card.find(id).then(card => {
    dispatch(setCard(card));
  });
};

export const selectCardDetail = (id: string) => (state: RootState) =>
  state.cardDetails[id] || { status: SliceStatus.EMPTY };

export default slice.reducer;
