import React from "react";
import { useCardDetailStyle } from "./use-card-detail-style";
import Box from "@material-ui/core/Box";

const EvolvesFrom: React.FC<{ evolvesFrom: string; label: string }> = ({
  evolvesFrom,
  label
}) => {
  const classes = useCardDetailStyle();
  return (
    <Box>
      <span className={classes.label}>{label} :</span>
      <span>{evolvesFrom}</span>
    </Box>
  );
};
export default EvolvesFrom;
