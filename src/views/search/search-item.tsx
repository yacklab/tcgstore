import React from "react";
import { IDetailCard } from "../../types/app";
import { useStyles } from "../../app/styles";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addToBaket } from "../../app/store/slices/basket";

interface ISearchItem {
  onClick: (id: string) => void;
  card: IDetailCard;
}

const SearchItem: React.FC<ISearchItem> = ({
  card,
  onClick // setDetailsDrawer
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Paper
      elevation={0}
      className={classes.searchItemPaper}
      onClick={() => {
        onClick(card.card.id);
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3} sm={6}>
          <ButtonBase className={classes.searchItemImage}>
            <img
              className={classes.searchItemImg}
              alt={`${card.card.name}-img`}
              src={card.card.imageUrl}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={9} sm={6} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {card.card.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {card.card.rarity}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {card.card.types}
              </Typography>
            </Grid>
            <Grid
              item
              spacing={2}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle1">{card.price.tag}</Typography>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  size="small"
                  color="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(addToBaket({ id: card.card.id }));
                  }}
                >
                  <AddShoppingCartIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default SearchItem;
