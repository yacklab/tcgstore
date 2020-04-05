import React, { useState } from "react";
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
import BasketPeek from "./basket-peek";
import SearchInput from "./search-input";
import Box from "@material-ui/core/Box";

const AppHeader = () => {
  const [peekElAnchor, setPeekElAnchor] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { totalPriceTag, basketCount } = useSelector(selectPrice);

  const showPeek = (event: React.MouseEvent<HTMLElement>) => {
    if (basketCount > 0) {
      setPeekElAnchor(event.currentTarget);
    }
  };

  const hidePeek = () => {
    setPeekElAnchor(null);
  };
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar)}
        color="default"
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <Link to={appRoutes.home.path}>
              <img src="/pokestore.png" alt="" />
            </Link>
          </div>
          <Box className={classes.appBarSearch}>
            <SearchInput />
          </Box>
          <IconButton color="inherit" onClick={showPeek}>
            <Badge badgeContent={basketCount} color="primary">
              <ShoppingBasketIcon />
            </Badge>
            <Typography>{totalPriceTag}</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <BasketPeek anchorEl={peekElAnchor} handleClose={hidePeek} />
    </React.Fragment>
  );
};

export default AppHeader;
