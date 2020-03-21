import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchResultsReducer from "./slices/search-results";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
