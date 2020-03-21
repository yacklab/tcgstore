import React from "react";
import { useStyles } from "../app/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
import { appRoutes } from "../app/router/routes";

const AppHeader = () => {
  const classes = useStyles();

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
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
