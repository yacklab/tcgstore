import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketContent,
  selectQuantityMap
} from "../../app/store/slices/basket";

const Basket = () => {
  const basketContent = useSelector(selectBasketContent);
  const quantityMap = useSelector(selectQuantityMap);

  return (
    <div>
      {basketContent.map(c => {
        const q = quantityMap[c.card.id];
        return <div>{c.price}</div>;
      })}
    </div>
  );
};

export default Basket;
