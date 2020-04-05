import React from "react";
import RarityFilter from "./filters/rarity";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SearchInput from "../../../containers/search-input";

import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => {
  return {
    spacingV: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    searchInputWrapper: {
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block"
      }
    }
  };
});

const Filters = () => {
  const classes = useStyle();
  return (
    <Box style={{ width: "100%", padding: 8 }}>
      <Typography className={classes.spacingV} variant="h5">
        Filters
      </Typography>
      <div className={[classes.spacingV, classes.searchInputWrapper].join(" ")}>
        <SearchInput fullWidth />
      </div>
      <RarityFilter />
    </Box>
  );
};

export default Filters;
