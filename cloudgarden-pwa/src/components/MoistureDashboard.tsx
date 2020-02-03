/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React from "react";
import { Layer, IconChevronRight } from "sancho";
import "../Dashboard.css";
import PercentChart from "./PercentChart";
import GraphIcon from "./GraphIcon";
import { ReactComponent as Cactus } from "./cactus.svg";
import { ReactComponent as Aloe } from "./aloe_vera.svg";
import { ReactComponent as Snake } from "./snake_plant.svg";

class MoistureDashboard extends React.Component {
  render() {
    return (
      <div className="moisture-dashboard column-container">
        <div className="row-container parent fit-content">
          <Layer
            elevation="lg"
            className="percent-chart-layer column-container-space-around"
          >
            <PercentChart percent={40} />
            <h4>average moisture</h4>
          </Layer>
          <Layer
            elevation="lg"
            className="history-chart-button column-container-space-around"
          >
            <GraphIcon width="80%" height="90%" color="#45b649" />
            <h4 className="inline">see history</h4>
          </Layer>
        </div>
        <Layer elevation="lg" className="row-container plant-button full-width">
          <Aloe height="25%" width="25%" />
          <h2>Plant 1</h2>
          <IconChevronRight height="50%" />
        </Layer>
        <Layer elevation="lg" className="row-container plant-button full-width">
          <Cactus height="25%" width="25%" />
          <h2>Plant 2</h2>
          <IconChevronRight height="50%" />
        </Layer>
        <Layer elevation="lg" className="row-container plant-button full-width">
          <Snake height="25%" width="25%" />
          <h2>Plant 3</h2>
          <IconChevronRight height="50%" />
        </Layer>
      </div>
    );
  }
}

export default MoistureDashboard;
