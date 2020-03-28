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
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
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

      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    itemAvatar: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      margin: "0 20px 0 0"
    },
    cardItem: {
      padding: theme.spacing(1)
    }
  };
});
