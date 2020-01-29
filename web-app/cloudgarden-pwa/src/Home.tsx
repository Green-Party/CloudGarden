/** @jsx jsx */
import React, { Suspense, lazy } from "react";
import { Layer } from "sancho";
import { jsx } from "@emotion/core";
import "./Dashboard.css";
import Tab from "./components/Tab";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import PercentChart from "./components/PercentChart";
import HistoryChart from "./components/HistoryChart";
import MoistureDashboard from "./components/MoistureDashboard";
const About = lazy(() => import("./About"));

function Topic() {
  let { sensorId } = useParams();
  return (
    <div className="row-container">
      <h3>Requested sensor: {sensorId}</h3>
    </div>
  );
}

const Home: React.FC = () => {
  const match = useRouteMatch();
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
