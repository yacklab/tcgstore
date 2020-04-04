import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardDetail,
  fetchCard
} from "../../app/store/slices/card-details";
import { SliceStatus } from "../../app/store/types";
import Button from "@material-ui/core/Button";
import { addToBaket } from "../../app/store/slices/basket";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { AttributeKeysLabelMap } from "./list-attributes";
import Ability from "./ability";
import Attacks from "./attacks";
import RetreatCost from "./retreat-cost";
import EvolvesFrom from "./evolves-from";
import ListAttributes from "./list-attributes";
import Box from "@material-ui/core/Box";
import { useCardDetailStyle } from "./use-card-detail-style";
import Paper from "@material-ui/core/Paper";

const cardAttributes: AttributeKeysLabelMap[] = [
  {
    key: "supertype",
    label: "Supertype"
  },
  {
    key: "subtype",
    label: "Subtype"
  },
  {
    key: "rarity",
    label: "Rarity"
  },
  {
    key: "artist",
    label: "Arists"
  },
  {
    key: "series",
    label: "Series"
  },
  {
    key: "set",
    label: "Set"
  }
];
const pokemonAttributes: AttributeKeysLabelMap[] = [
  {
    key: "hp",
    label: "HP"
  },
  {
    key: "types",
    label: "Types"
  },
  {
    key: "text",
    label: "Note"
  },
  {
    key: "evolvesFrom",
    label: "Evolve From",
    component: EvolvesFrom
  },
  {
    key: "ability",
    label: "Ability",
    component: Ability
  },
  {
    key: "attacks",
    label: "Attacks",
    component: Attacks
  },
  {
    key: "retreatCost",
    label: "Retreat Cost",
    component: RetreatCost
  }
];

const CardDetail: React.FC<{ id: string }> = ({ id }) => {
  const cardDetail = useSelector(selectCardDetail(id));
  const classes = useCardDetailStyle();
  const { card, status, price } = cardDetail;
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== SliceStatus.IDLE) {
      dispatch(fetchCard(id));
    }
  }, [cardDetail, dispatch, id, status]);

  if (status !== SliceStatus.IDLE) {
    return <div>loading</div>;
  }

  return (
    <React.Fragment>
      <Container>
        <Box className={classes.pageHead}>
          <Typography variant="h4">{card.name}</Typography>
        </Box>
        <Box className={classes.contentWrapper}>
          <Box className={classes.imgWrapper}>
            <img src={card.imageUrl} alt="" />
            <Box className={classes.callToActionWrapper}>
              <Typography variant="subtitle1">{price.tag}</Typography>
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                onClick={() => dispatch(addToBaket({ id }))}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
          <Paper elevation={0} className={classes.attributesWrapper}>
            <Typography variant="h5">Card Attributes</Typography>
            <ListAttributes attributes={cardAttributes} card={card} />
            <Typography variant="h5">Pokemon Attributes</Typography>

            <ListAttributes attributes={pokemonAttributes} card={card} />
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CardDetail;
