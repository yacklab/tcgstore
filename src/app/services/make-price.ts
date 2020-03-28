import { ICard } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { ICardPrice, currency } from "../../types/app";
import random from "lodash/random";
import round from "lodash/round";

const options: { [key: string]: { min: number; max: number } } = {
  default: {
    min: 100,
    max: 2000
  },
  Common: {
    min: 100,
    max: 500
  },
  Uncommon: {
    min: 400,
    max: 900
  },
  "Rare Holo": {
    min: 1000,
    max: 9000
  },
  "Rare Holo EX": {
    min: 10000,
    max: 90000
  },
  Rare: {
    min: 900,
    max: 2000
  }
};

export const priceToTag = (price: number, currency: currency) => {
  const n = round(price / 100, 1).toString();
  return `${n}${n.includes(".") ? "0" : ".00"} ${currency}`;
};

export default function(card: ICard): ICardPrice {
  if (!options[card.rarity]) {
    console.log(card.rarity);
  }
  const price =
    random(
      options[card.rarity || "default"].min,
      options[card.rarity || "default"].max
    ) * 10; // temporary random price

  const priceCurrency = currency.EURO;
  return {
    price,
    currency: priceCurrency,
    tag: priceToTag(price, priceCurrency)
  };
}
