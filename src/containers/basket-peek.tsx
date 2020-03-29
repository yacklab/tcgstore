import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasketContent,
  addToBaket,
  removeFromBasket,
  selectQuantityMap,
  setQuantity
} from "../app/store/slices/basket";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import { useInputValue } from "../hooks/use-input-value";
import { IDetailCard } from "../types/app";
import { Link } from "react-router-dom";
import { appRoutes } from "../app/router/routes";

interface IBasketPeekProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
interface IBasketPeekItemProps {
  card: IDetailCard;
  quantity: number;
}

const BasketPeekItem: React.FunctionComponent<IBasketPeekItemProps> = ({
  card,
  quantity
}) => {
  const fieldQuantity = useInputValue(quantity.toString());
  const dispatch = useDispatch();
  const handleBlur = () => {
    try {
      const q: number = parseInt(fieldQuantity.value, 10);
      dispatch(setQuantity({ id: card.card.id, quantity: q }));
    } catch (error) {
      throw new Error("Field returning an unparsable string");
    }
  };
  return (
    <React.Fragment>
      {card.price.tag}
      <AddIcon onClick={() => dispatch(addToBaket({ id: card.card.id }))} />
      <TextField type="number" {...fieldQuantity} onBlur={handleBlur} />
      <RemoveIcon
        onClick={() => dispatch(removeFromBasket({ id: card.card.id }))}
      />
    </React.Fragment>
  );
};

const BasketPeek: React.FunctionComponent<IBasketPeekProps> = ({
  anchorEl,
  handleClose
}) => {
  const basketContent = useSelector(selectBasketContent);
  const quantityMap = useSelector(selectQuantityMap);
  const open = Boolean(anchorEl) && Boolean(basketContent.length);
  return (
    <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {basketContent.map(c => {
        const q = quantityMap[c.card.id];
        return (
          <MenuItem key={`${c.card.id}-${q}`}>
            <BasketPeekItem card={c} quantity={q} />
          </MenuItem>
        );
      })}
      <MenuItem>
        <Link to={appRoutes.basket.path}>voir le panier</Link>
      </MenuItem>
    </Menu>
  );
};

export default BasketPeek;
