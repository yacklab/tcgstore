import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import get from "lodash/get";
import { currency } from "../../../types/app";
import { priceToTag } from "../../services/make-price";

interface IBasketState {
  cardIds: string[];
  currency: currency;
}

const initialState: IBasketState = {
  cardIds: [],
  currency: currency.EURO
};

export const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBaket: (state: IBasketState, action: PayloadAction<string>) => {
      state.cardIds.push(action.payload);
    },
    removeCard: (state: IBasketState, action: PayloadAction<string>) => {}
  }
});

export const { addToBaket, removeCard } = slice.actions;

export const selectPrice = (state: RootState) => {
  const { cardIds } = state.basket;
  const totalPrice = cardIds.reduce((acc, id) => {
    const p: number = get(state, `cardDetails[${id}].price.price`, false);
    if (!p) throw new Error("Wrong id in the basket");
    return (acc += p);
  }, 0);
  return {
    totalPriceTag: priceToTag(totalPrice, state.basket.currency),
    basketCount: cardIds.length
  };
};

export default slice.reducer;
