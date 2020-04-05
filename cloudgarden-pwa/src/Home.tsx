/**
 * Creation Date: January 28, 2020
 * Author: Gillian Pierce
 * The main dashboard component, provides access to specific sensor data dashboards
 */

import React from "react";
import "./Dashboard.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import Tabs from "./components/main/Tabs";
import MoistureDashboard from "./components/moisture/MoistureDashboard";
import LightDashboard from "./components/light/LightDashboard";
import TemperatureDashboard from "./components/temperature/TemperatureDashboard";
import WaterLevelDashboard from "./components/waterLevel/WaterLevelDashboard";
import { PrivateRoute } from "./components/auth";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    marginTop: 16
  },
  mobileContainer: {
    width: "100vw"
  },
  item: {
    marginTop: 16
  }
});
const Home: React.FC = () => {
  const match = useRouteMatch();
  const styles = useStyles();
  const mobile = !useMediaQuery("(min-width:400px)");
  //Top layer is used to select which sensor data to display
  //Routes point to the various dashboard components
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={mobile ? styles.mobileContainer : styles.container}
    >
      <Grid item className={styles.item}>
        <Tabs
          tabValues={[
            { target: `${match.url}/moisture`, label: "moisture" },
            { target: `${match.url}/temp`, label: "temperature" },
            { target: `${match.url}/light`, label: "uv/light" },
            { target: `${match.url}/water`, label: "water" }
          ]}
        />
      </Grid>
      <Grid item className={styles.item}>
        <Switch>
          <PrivateRoute
            exact
            path={`${match.path}/moisture`}
            component={MoistureDashboard}
          />
          <PrivateRoute
            exact
            path={`${match.path}/light`}
            component={LightDashboard}
          />
          <PrivateRoute
            exact
            path={`${match.path}/temp`}
            component={TemperatureDashboard}
          />
          <PrivateRoute
            exact
            path={`${match.path}/water`}
            component={WaterLevelDashboard}
          />
          <Route path={match.path}>
            <Typography variant={mobile ? "overline" : "h5"} color="secondary">
              Please select a sensor.
            </Typography>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Home;
