import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./slices/search-results";
import searchParamsReducer from "./slices/search-params";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    searchParams: searchParamsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
