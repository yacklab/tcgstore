import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketContent,
  selectQuantityMap,
  selectPrice
} from "../../app/store/slices/basket";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import BasketItem from "./basket-item";
import Container from "@material-ui/core/Container";
import { Typography, createStyles, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
);

const Basket = () => {
  const basketContent = useSelector(selectBasketContent);
  const quantityMap = useSelector(selectQuantityMap);
  const { totalPriceTag } = useSelector(selectPrice);
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5">Your Cart</Typography>
      <List>
        {basketContent.map(c => {
          const q = quantityMap[c.card.id];
          return (
            <ListItem key={`${c.card.id}-${q}`}>
              <BasketItem card={c} quantity={q} />
            </ListItem>
          );
        })}
      </List>
      <Grid container direction="row" justify="flex-end">
        <Grid item>
          <Typography
            style={{ margin: "8px 0" }}
            variant="body2"
          >{`Total : ${totalPriceTag}`}</Typography>
          <Button
            onClick={() =>
              console.log("Are you really willing to spend that much ?")
            }
            variant="contained"
            disableElevation
            color="secondary"
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Basket;
