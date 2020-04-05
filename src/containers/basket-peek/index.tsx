import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketContent,
  selectQuantityMap,
  selectPrice
} from "../../app/store/slices/basket";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { appRoutes } from "../../app/router/routes";
import BasketPeekItem from "./basket-peek-item";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

interface IBasketPeekProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const BasketPeek: React.FunctionComponent<IBasketPeekProps> = ({
  anchorEl,
  handleClose
}) => {
  const basketContent = useSelector(selectBasketContent);
  const quantityMap = useSelector(selectQuantityMap);
  const { totalPriceTag } = useSelector(selectPrice);
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
      <Typography align="center" variant="h6">
        Your Cart
      </Typography>
      {basketContent.map(c => {
        const q = quantityMap[c.card.id];
        return (
          <MenuItem key={`${c.card.id}-${q}`}>
            <BasketPeekItem card={c} quantity={q} />
          </MenuItem>
        );
      })}
      <MenuItem>
        <Grid container direction="column" alignItems="center">
          <Typography
            style={{ margin: "8px 0" }}
            variant="body2"
          >{`total : ${totalPriceTag}`}</Typography>
          <Link onClick={handleClose} to={appRoutes.basket.path}>
            Show cart
          </Link>
        </Grid>
      </MenuItem>
    </Menu>
  );
};

export default BasketPeek;
