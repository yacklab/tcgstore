import React from "react";

import { IAbility } from "pokemon-tcg-sdk-typescript/dist/interfaces/ability";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import { useCardDetailStyle } from "./use-card-detail-style";

const Ability: React.FC<{ ability: IAbility; label: string }> = ({
  ability,
  label
}) => {
  const classes = useCardDetailStyle();
  return (
    <Box className={classes.attributeWrapper}>
      <Typography className={classes.attributeTitle} variant="h6">
        {label}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        wrap="wrap"
      >
        <Typography variant="subtitle1">{ability.name}</Typography>
        <Typography variant="subtitle2">{ability.type}</Typography>
      </Grid>
      <Typography variant="body2">{ability.text}</Typography>
    </Box>
  );
};

export default Ability;
