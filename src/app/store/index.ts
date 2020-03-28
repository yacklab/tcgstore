import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./slices/search-results";
import searchParamsReducer from "./slices/search-params";
import cardDetailsReducer from "./slices/card-details";
import basketReducer from "./slices/basket";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    searchParams: searchParamsReducer,
    cardDetails: cardDetailsReducer,
    basket: basketReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
