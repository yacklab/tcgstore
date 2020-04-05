import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex"
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.appBar
    },
    appBarSearch: {
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },

    filterDrawerPaper: {
      position: "fixed",
      top: theme.spacing(8),
      whiteSpace: "nowrap",
      width: drawerWidth,
      height: `calc(100vh - ${theme.spacing(8)}px)`,
      [theme.breakpoints.down("xs")]: {
        height: `calc(100vh - ${theme.spacing(7)}px)`,
        top: theme.spacing(7),
        width: `calc(100vw - ${theme.spacing(1)}px)`
      },
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    filterDrawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0)
      }
    },
    detailsDrawerPaper: {
      width: 400,
      height: `100vh`,
      [theme.breakpoints.down("xs")]: {
        height: `calc(100vh - ${theme.spacing(7)}px)`,
        top: theme.spacing(7),
        width: `calc(100vw - ${theme.spacing(1)}px)`
      },
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    detailsDrawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0)
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      position: "relative",
      flexGrow: 1,
      height: `calc(100vh - ${theme.spacing(8)}px)`,
      marginLeft: drawerWidth,
      [theme.breakpoints.down("xs")]: {
        height: `calc(100vh - ${theme.spacing(7)}px)`,
        marginLeft: 0
      },
      padding: theme.spacing(2),
      overflow: "auto"
    },
    resultsWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridColumnGap: theme.spacing(1),
      gridRowGap: theme.spacing(1),
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr"
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    searchItem: {
      flexGrow: 1
    },
    searchItemPaper: {
      padding: theme.spacing(2),
      height: "100%",
      width: "100%"
    },
    searchItemImage: {
      width: 128,
      height: "auto",
      [theme.breakpoints.down("xs")]: {
        width: 64
      }
    },
    searchItemImg: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  };
});
