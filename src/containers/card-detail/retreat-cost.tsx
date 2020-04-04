import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import map from "lodash/map";
import { useCardDetailStyle } from "./use-card-detail-style";

export const stringifyCost = (costs: string[]): string => {
  let acc: any = {};
  costs.forEach(c => {
    if (acc[c]) {
      acc[c]++;
    } else {
      acc[c] = 1;
    }
  });
  return map(acc, (v, k) => `${k} x ${v}`).join(", ");
};

const RetreatCost: React.FC<{ retreatCost: string[]; label: string }> = ({
  retreatCost,
  label
}) => {
  const classes = useCardDetailStyle();
  return (
    <Box className={classes.attributeWrapper}>
      <Typography className={classes.attributeTitle} variant="h6">
        {label}
      </Typography>
      <Typography variant="body1">{stringifyCost(retreatCost)}</Typography>
    </Box>
  );
};

export default RetreatCost;
