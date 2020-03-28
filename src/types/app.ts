import { SliceStatus } from "../app/store/types";
import { ICard } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

export enum currency {
  DOLLAR = "$",
  EURO = "€"
}

export interface ICardPrice {
  price: number;
  currency: currency;
  tag: string;
}

export interface IDetailCard {
  status: SliceStatus;
  price: ICardPrice;
  card: ICard;
}
