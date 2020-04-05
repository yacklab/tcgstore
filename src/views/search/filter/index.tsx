import React from "react";
import RarityFilter from "./filters/rarity";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SearchInput from "../../../containers/search-input";

import { makeStyles } from "@material-ui/core/styles";
import SubtypesFilter from "./filters/subtypes";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const useStyle = makeStyles(theme => {
  return {
    panelHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
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
      <ExpansionPanel elevation={0} defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.panelHeading}>Rarity</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RarityFilter />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.panelHeading}>Subtype</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SubtypesFilter />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default Filters;
