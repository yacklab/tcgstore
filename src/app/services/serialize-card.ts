import { ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { IDetailCard } from "../../types/app";
import makePrice from "./make-price";
import { SliceStatus } from "../store/types";

export default function(card: ICard): IDetailCard {
  return {
    price: makePrice(card),
    status: SliceStatus.IDLE,
    card
  };
}
