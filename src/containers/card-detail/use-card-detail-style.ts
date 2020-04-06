import { makeStyles } from "@material-ui/core/styles";

export const useCardDetailStyle = makeStyles((theme) => {
  return {
    pageHead: {
      padding: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },
    callToActionWrapper: {
      textAlign: "center",
    },
    imgWrapper: {
      margin: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        margin: `${theme.spacing(3)}px auto`,
      },
      "& > img": {
        width: "100%",
      },
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    label: {
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
    attributeWrapper: {
      width: "100%",
      padding: `${theme.spacing(1)}px 0`,
    },
    attributeTitle: {
      color: theme.palette.primary.main,
    },
    attributesWrapper: {
      flex: "1 1",
      padding: theme.spacing(3),
      margin: 0,
    },
    inlineAttributes: {
      width: "100%",
      justifyContent: "flex-start",
      "& > *": {
        marginRight: theme.spacing(1),
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
        marginRight: 0,
      },
    },
  };
});
