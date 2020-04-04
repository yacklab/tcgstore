import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IAttack } from "pokemon-tcg-sdk-typescript/dist/sdk";
import Grid from "@material-ui/core/Grid";
import { stringifyCost } from "./retreat-cost";
import { useCardDetailStyle } from "./use-card-detail-style";
import Divider from "@material-ui/core/Divider";

const Attacks: React.FC<{ attacks: IAttack[]; label: string }> = ({
  attacks,
  label
}) => {
  const classes = useCardDetailStyle();
  return (
    <Box className={classes.attributeWrapper}>
      <Typography className={classes.attributeTitle} variant="h6">
        {label}
      </Typography>
      {attacks.map((attack, index) => (
        <React.Fragment key={attack.name}>
          {index !== 0 && <Divider style={{ margin: "10px 0" }} />}
          <Box>
            <Grid
              container
              className={classes.inlineAttributes}
              direction="row"
              alignItems="center"
              wrap="wrap"
            >
              <Typography variant="subtitle1">{attack.name}</Typography>
              <Typography variant="subtitle2" component="div">
                {stringifyCost(attack.cost)}
              </Typography>
            </Grid>
            {attack.damage && (
              <Typography>
                <span style={{ fontWeight: "bold" }}>Damage:</span>{" "}
                {attack.damage}
              </Typography>
            )}
            <Typography variant="body2">{attack.text}</Typography>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Attacks;
