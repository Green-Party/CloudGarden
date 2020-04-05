/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component is a simple loading visual
 */

import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loading: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#28352E"
  }
});

const Loading = () => {
  const classes = useStyles();

  const small = useMediaQuery("(min-width: 400px) and (max-width: 700px)");
  const medium = useMediaQuery("(min-width: 700px) and (max-width: 900px)");
  const large = useMediaQuery("(min-width: 900px)");

  let width: number;
  if (small) {
    width = 400;
  } else if (medium) {
    width = 700;
  } else if (large) {
    width = 800;
  } else {
    width = 300;
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.loading}
    >
      <img
        src={process.env.PUBLIC_URL + "/loading.gif"}
        alt="Loading"
        width={width}
        height={width}
      />
    </Grid>
  );
};

export default Loading;
