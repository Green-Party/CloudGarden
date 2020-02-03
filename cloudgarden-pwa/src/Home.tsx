/** @jsx jsx */
/**
 * Creation Date: January 28, 2020
 * Author: Gillian Pierce
 * The main dashboard component, provides access to specific sensor data dashboards
 */

import React from "react";
import { Layer } from "sancho";
import { jsx } from "@emotion/core";
import "./Dashboard.css";
import Tab from "./components/Tab";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MoistureDashboard from "./components/MoistureDashboard";

const Home: React.FC = () => {
  const match = useRouteMatch();
  //Top layer is used to select which sensor data to display
  //Routes point to the various dashboard components
  //(only moisture is implemented currently)
  return (
    <div className="column-container">
      <Layer elevation="lg">
        <div className="row-container">
          <Tab target={`${match.url}/moisture`} label="moisture" />
          <Tab target={`${match.url}/temp`} label="temperature" />
          <Tab target={`${match.url}/light`} label="uv/light" />
          <Tab target={`${match.url}/water`} label="water" />
        </div>
      </Layer>
      <Switch>
        <Route path={`${match.path}/:sensorId`}>
          <MoistureDashboard />
        </Route>
        <Route path={match.path}>
          <div className="row-container">
            <h3>Please select a sensor.</h3>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
