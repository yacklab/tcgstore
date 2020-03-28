import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import get from "lodash/get";
import { currency, IDetailCard } from "../../../types/app";
import { priceToTag } from "../../services/make-price";
import reduce from "lodash/reduce";
import keys from "lodash/keys";
import map from "lodash/map";
import mapValues from "lodash/mapValues";

interface IBasketState {
  basketItems: BasketItems;
  currency: currency;
}

interface BasketItems {
  [key: string]: {
    quantity: number;
  };
}

const initialState: IBasketState = {
  basketItems: {},
  currency: currency.EURO
};

export const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBaket: (state: IBasketState, action: PayloadAction<string>) => {
      const item = state.basketItems[action.payload];
      if (item) {
        item.quantity++;
      } else {
        state.basketItems[action.payload] = {
          quantity: 1
        };
      }
    },
    removeCard: (state: IBasketState, action: PayloadAction<string>) => {}
  }
});

export const { addToBaket, removeCard } = slice.actions;

export const selectPrice = (state: RootState) => {
  const { basketItems } = state.basket;
  const totalPrice = reduce(
    basketItems,
    (acc, item, key) => {
      const p: number = get(state, `cardDetails[${key}].price.price`, false);
      if (!p) throw new Error("Wrong id in the basket");
      return (acc += p * item.quantity);
    },
    0
  );
  return {
    totalPriceTag: priceToTag(totalPrice, state.basket.currency),
    basketCount: keys(basketItems).length
  };
};

interface QuantityMap {
  [key: string]: number;
}

export const selectBasketContent = (state: RootState) => {
  const { basketItems } = state.basket;
  const basketContent = map(basketItems, (_, key) => {
    const card = state.cardDetails[key];
    if (!card) throw new Error("Wrong id in the basket");
    return card;
  });
  const quantityMap = mapValues(basketItems, i => i.quantity);

  return {
    quantityMap,
    basketContent
  };
};

export default slice.reducer;
