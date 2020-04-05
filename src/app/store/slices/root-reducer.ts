import searchResultsReducer, { ISearchState } from "./search-results";
import searchParamsReducer, { ISearchParams } from "./search-params";
import cardDetailsReducer, { ICardDetailState } from "./card-details";
import basketReducer, { IBasketState } from "./basket";
import { combineReducers } from "@reduxjs/toolkit";

export type RootState = {
  searchResults: ISearchState;
  searchParams: ISearchParams;
  cardDetails: ICardDetailState;
  basket: IBasketState;
};

export default combineReducers({
  searchResults: searchResultsReducer,
  searchParams: searchParamsReducer,
  cardDetails: cardDetailsReducer,
  basket: basketReducer
});
