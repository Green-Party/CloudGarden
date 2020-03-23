/**
 * Creation Date: January 28, 2020
 * Author: Gillian Pierce
 * The main dashboard component, provides access to specific sensor data dashboards
 */

import React from "react";
import "./Dashboard.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Tabs from "./components/main/Tabs";
import MoistureDashboard from "./components/moisture/MoistureDashboard";
import LightDashboard from "./components/light/LightDashboard";
import TemperatureDashboard from "./components/temperature/TemperatureDashboard";
import WaterLevelDashboard from "./components/waterLevel/WaterLevelDashboard";
import { PrivateRoute } from "./components/auth";

const Home: React.FC = () => {
  const match = useRouteMatch();
  //Top layer is used to select which sensor data to display
  //Routes point to the various dashboard components
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
      style={{ marginTop: "16px" }}
    >
      <Grid item>
        <Tabs
          tabValues={[
            { target: `${match.url}/moisture`, label: "moisture" },
            { target: `${match.url}/temp`, label: "temperature" },
            { target: `${match.url}/light`, label: "uv/light" },
            { target: `${match.url}/water`, label: "water" }
          ]}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
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
            <div className="row-container">
              <Typography variant="h3" color="secondary">
                Please select a sensor.
              </Typography>
            </div>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Home;
