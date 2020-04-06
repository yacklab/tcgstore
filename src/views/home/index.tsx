import React from "react";
import { appRoutes } from "../../app/router/routes";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Box } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: `0 ${theme.spacing(3)}px`,
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gridTemplateRows: "repeat(8, 1fr)",
      gridColumnGap: "0px",
      gridRowGap: "0px",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
      },
    },
    hero: {
      position: "relative",
      gridArea: "1 / 1 / 3 / 7",
      [theme.breakpoints.down("xs")]: {
        gridArea: "1 / 1 / 2 / 5",
      },
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
      padding: theme.spacing(3),
    },

    focus: {
      gridArea: "1 / 7 / 2 / 9",
      [theme.breakpoints.down("xs")]: {
        gridArea: "2 / 1 / 3 / 3",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      },
      cursor: "pointer",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(3),
    },
    powerCard: {
      gridArea: "2 / 7 / 3 / 9",
      [theme.breakpoints.down("xs")]: {
        gridArea: "2 / 3 / 3 / 5",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      },
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(3),
    },
    banner: {
      gridArea: "3 / 1 / 4 / 9",
      [theme.breakpoints.down("xs")]: {
        gridArea: "3 / 1 / 4 / 5",
      },
      cursor: "pointer",
      textAlign: "center",
      padding: theme.spacing(3),
    },
    bannerText: {
      fontWeight: 900,
      textDecoration: "underline",
      padding: `${theme.spacing(1)}px 0`,
      [theme.breakpoints.down("xs")]: {
        fontSize: `calc(${theme.typography.h1["fontSize"]} - 45px)`,
        padding: 0,
      },
      "& span": {
        transition: "color 200ms ease",
      },
      "&:hover > span": {
        color: theme.palette.secondary.dark,
      },
    },
    searchLink: {
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {},
    },
    searchLinkWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    heroImg: {
      maxWidth: "100%",
      height: "auto",
    },
    focusImg: {
      width: "100%",
      height: "auto",
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const goTo = (name: string, value: string | number) => {
    const path = appRoutes.search.getPath([{ name, value }]);
    history.push(path);
  };
  const searchName = (name: string) => {
    goTo("name", name);
  };
  return (
    <React.Fragment>
      <Box className={classes.searchLinkWrapper}>
        <Link to={appRoutes.search.path} className={classes.searchLink}>
          <Typography variant="subtitle2">Search</Typography>
          <ArrowForwardIosIcon />
        </Link>
      </Box>

      <div className={classes.wrapper}>
        <Box
          onClick={() => {
            searchName("blastoise");
          }}
          className={classes.hero}
        >
          <img
            className={classes.heroImg}
            src="/images/mega_blastoise.png"
            alt=""
          />
          <Typography
            style={{
              fontWeight: 700,
              position: "absolute",
              bottom: 8,
              right: 16,
            }}
            variant="h2"
          >
            Discover Blastoise
          </Typography>
        </Box>
        <Box
          onClick={() => {
            searchName("charizard");
          }}
          className={classes.focus}
        >
          <img
            className={classes.focusImg}
            src="/images/charizard.png"
            alt=""
          />
          <Typography variant="h6">Focus on Charizard</Typography>
        </Box>
        <Box
          onClick={() => {
            searchName("mewtwo");
          }}
          className={classes.powerCard}
        >
          <img className={classes.focusImg} src="/images/mewtwo.png" alt="" />
          <Typography variant="h6">Mewtwo Strikes Back</Typography>
        </Box>
        <Box
          onClick={() => {
            goTo("rarity", "RARE HOLO");
          }}
          className={classes.banner}
        >
          <Typography className={classes.bannerText} variant="h1">
            Discover <span>Rare Holo</span> collection
          </Typography>
        </Box>
        <Box></Box>
      </div>
    </React.Fragment>
  );
};

export default Home;
