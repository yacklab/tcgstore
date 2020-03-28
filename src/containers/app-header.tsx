import React from "react";
import { useStyles } from "../app/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { appRoutes } from "../app/router/routes";
import { useSelector } from "react-redux";
import { selectPrice } from "../app/store/slices/basket";
import Typography from "@material-ui/core/Typography";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const AppHeader = () => {
  const classes = useStyles();
  const { totalPriceTag, basketCount } = useSelector(selectPrice);

  return (
    <AppBar position="fixed" className={clsx(classes.appBar)} color="default">
      <Toolbar className={classes.toolbar}>
        <div>
          <Link to={appRoutes.home.path}>
            <img src="/pokestore.png" alt="" />
          </Link>
        </div>
        <div></div>
        <IconButton color="inherit">
          <Badge badgeContent={basketCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
          <Typography>{totalPriceTag}</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
