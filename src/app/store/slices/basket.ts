import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import get from "lodash/get";
import { currency } from "../../../types/app";
import { priceToTag } from "../../services/make-price";
import reduce from "lodash/reduce";
import map from "lodash/map";
import mapValues from "lodash/mapValues";

interface IBasketState {
  basketItems: IBasketItems;
  currency: currency;
}

interface IBasketItems {
  [key: string]: {
    quantity: number;
  };
}

interface IBasketPayload {
  id: string;
  quantity?: number;
}

const initialState: IBasketState = {
  basketItems: {},
  currency: currency.EURO
};

export const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setQuantity: (
      state: IBasketState,
      action: PayloadAction<Required<IBasketPayload>>
    ) => {
      if (action.payload.quantity && action.payload.quantity < 0) {
        throw new Error("Quantity must be a positive int");
      }
      const item = state.basketItems[action.payload.id];
      const quantity = action.payload.quantity;
      if (item && quantity === 0) {
        delete state.basketItems[action.payload.id];
      } else if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.basketItems[action.payload.id] = {
          quantity: action.payload.quantity
        };
      }
    },
    addToBaket: (
      state: IBasketState,
      action: PayloadAction<IBasketPayload>
    ) => {
      if (action.payload.quantity && action.payload.quantity < 0) {
        throw new Error("Quantity must be a positive int");
      }

      const item = state.basketItems[action.payload.id];
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.basketItems[action.payload.id] = {
          quantity: action.payload.quantity || 1
        };
      }
    },
    removeFromBasket: (
      state: IBasketState,
      action: PayloadAction<IBasketPayload>
    ) => {
      const item = state.basketItems[action.payload.id];
      if (!item) throw new Error("Item not found");
      if (action.payload.quantity && action.payload.quantity < 0) {
        throw new Error("Quantity must be a positive int");
      }
      item.quantity -= action.payload.quantity || 1;
      if (item.quantity === 0) {
        delete state.basketItems[action.payload.id];
      }
    }
  }
});

export const { addToBaket, removeFromBasket, setQuantity } = slice.actions;

export const selectPrice = (state: RootState) => {
  const { basketItems } = state.basket;
  const { totalPrice, count } = reduce(
    basketItems,
    (acc, item, key) => {
      const p: number = get(state, `cardDetails[${key}].price.price`, false);
      if (!p) throw new Error("Wrong id in the basket");
      acc.totalPrice += p * item.quantity;
      acc.count += item.quantity;
      return acc;
    },
    {
      totalPrice: 0,
      count: 0
    }
  );
  return {
    totalPriceTag: priceToTag(totalPrice, state.basket.currency),
    basketCount: count
  };
};

export const selectBasketContent = (state: RootState) => {
  const { basketItems } = state.basket;
  return map(basketItems, (_, key) => {
    const card = state.cardDetails[key];
    if (!card) throw new Error("Wrong id in the basket");
    return card;
  });
};

export const selectQuantityMap = (state: RootState) => {
  return mapValues(state.basket.basketItems, i => i.quantity);
};

export default slice.reducer;
