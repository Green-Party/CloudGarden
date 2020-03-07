/**
 * Creation Date: January 28, 2020
 * Author: Gillian Pierce
 * The main dashboard component, provides access to specific sensor data dashboards
 */

import React from "react";
import "./Dashboard.css";
import Tabs from "./components/main/Tabs";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MoistureDashboard from "./components/moisture/MoistureDashboard";
import LightDashboard from "./components/light/LightDashboard";
import TemperatureDashboard from "./components/temperature/TemperatureDashboard";
import { Grid, Typography, Box } from "@material-ui/core";
import WaterLevelDashboard from "./components/waterLevel/WaterLevelDashboard";

const Home: React.FC = () => {
  const match = useRouteMatch();
  //Top layer is used to select which sensor data to display
  //Routes point to the various dashboard components
  //(only moisture is implemented currently)
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
      <Grid item>
        <Switch>
          <Route exact path={`${match.path}/moisture`}>
            <MoistureDashboard />
          </Route>
          <Route exact path={`${match.path}/light`}>
            <LightDashboard />
          </Route>
          <Route exact path={`${match.path}/temp`}>
            <TemperatureDashboard />
          </Route>
          <Route exact path={`${match.path}/water`}>
            <Box width={1}>
              <WaterLevelDashboard />
            </Box>
          </Route>
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
