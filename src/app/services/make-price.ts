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
  },
  LEGEND: {
    min: 900,
    max: 2000
  }
};

const cache: any = {};

export const priceToTag = (price: number, currency: currency) => {
  const n = round(price / 100, 1).toString();
  return `${n}${n.includes(".") ? "0" : ".00"} ${currency}`;
};

export default function(card: ICard): ICardPrice {
  if (cache[card.id]) {
    return cache[card.id];
  }
  const priceOption = options[card.rarity || "default"] || options["default"];
  const price = random(priceOption.min, priceOption.max) * 10; // temporary random price
  const priceCurrency = currency.EURO;
  const res = {
    price,
    currency: priceCurrency,
    tag: priceToTag(price, priceCurrency)
  };
  cache[card.id] = res;
  return res;
}
