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
import PlantSpecific from "./components/moisture/PlantSpecific";
import LightDashboard from "./components/light/LightDashboard";
import TempDashboard from "./components/temp/TempDashboard";
import { Grid, Typography } from "@material-ui/core";

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
            <TempDashboard />
          </Route>
          <Route
            exact
            path={`${match.path}/:sensorId/:plantId`}
            component={PlantSpecific}
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
