import React from "react";
import { useDispatch } from "react-redux";
import {
  addToBaket,
  removeFromBasket,
  setQuantity
} from "../../app/store/slices/basket";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import { useInputValue } from "../../hooks/use-input-value";
import { IDetailCard } from "../../types/app";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import { appRoutes } from "../../app/router/routes";
interface IBasketItemProps {
  card: IDetailCard;
  quantity: number;
}
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    deleteButton: {
      color: theme.palette.warning.main
    }
  })
);

const BasketItem: React.FunctionComponent<IBasketItemProps> = ({
  card,
  quantity
}) => {
  const fieldQuantity = useInputValue(quantity.toString());
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleBlur = () => {
    try {
      const q: number = parseInt(fieldQuantity.value, 10);
      dispatch(setQuantity({ id: card.card.id, quantity: q }));
    } catch (error) {
      throw new Error("Field returning an unparsable string");
    }
  };
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid
        justify="center"
        alignItems="center"
        xs={3}
        sm={6}
        item
        container
        direction="column"
      >
        <img
          style={{ width: 48, height: "auto" }}
          src={card.card.imageUrl}
          alt={`${card.card.name}-img`}
        />
        <Link to={appRoutes.details.getPath(card.card.id)}>
          <Typography variant="subtitle2" component="div">
            {card.card.name}
          </Typography>
        </Link>

        <Typography variant="body2"> {card.price.tag}</Typography>
      </Grid>

      <Grid xs={6} sm={3} item justify="center" alignItems="center">
        <RemoveIcon
          onClick={() => dispatch(removeFromBasket({ id: card.card.id }))}
        />
        <TextField
          style={{ width: 25, textAlign: "center" }}
          type="number"
          {...fieldQuantity}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              handleBlur();
            }
          }}
          onBlur={handleBlur}
        />
        <AddIcon onClick={() => dispatch(addToBaket({ id: card.card.id }))} />
      </Grid>
      <Grid item justify="center" alignItems="center" xs={3}>
        <IconButton
          onClick={() =>
            dispatch(setQuantity({ id: card.card.id, quantity: 0 }))
          }
          className={classes.deleteButton}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BasketItem;
