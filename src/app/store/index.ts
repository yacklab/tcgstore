import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./slices/search-results";
import searchParamsReducer from "./slices/search-params";
import cardDetailsReducer from "./slices/card-details";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    searchParams: searchParamsReducer,
    cardDetails: cardDetailsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
