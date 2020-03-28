import React from "react";
import { useSelector } from "react-redux";
import { selectBasketContent } from "../app/store/slices/basket";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

interface BasketPeekProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const BasketPeek: React.FunctionComponent<BasketPeekProps> = ({
  anchorEl,
  handleClose
}) => {
  const { basketContent, quantityMap } = useSelector(selectBasketContent);
  const open = Boolean(anchorEl);
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
        return (
          <MenuItem key={c.card.id} onClick={handleClose}>
            {c.price.tag} {quantityMap[c.card.id]}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default BasketPeek;
