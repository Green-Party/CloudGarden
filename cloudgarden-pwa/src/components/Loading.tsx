/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component is a simple loading visual
 */

import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loading: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#3d3d3d"
  }
});

const Loading = () => {
  const classes = useStyles();
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
        height="85%"
        width="90%"
      />
    </Grid>
  );
};

export default Loading;
