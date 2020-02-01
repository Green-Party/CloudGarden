import React from "react";
import {
  Layer,
  IconBarChart2,
  IconBarChart,
  IconMeh,
  IconChevronRight
} from "sancho";
import "../Dashboard.css";
import PercentChart from "./PercentChart";
import GraphIcon from "./GraphIcon";
class MoistureDashboard extends React.Component {
  render() {
    return (
      <div className="moisture-dashboard column-container">
        <div className="row-container parent">
          <Layer
            elevation="lg"
            className="history-chart-button column-container-space-around"
          >
            <PercentChart percent={40} />
          </Layer>
          <Layer
            elevation="lg"
            className="history-chart-button column-container-space-around"
          >
            <GraphIcon width="50%" height="50%" color="#45b649" />
            <h4>See History</h4>
          </Layer>
        </div>
        <Layer elevation="lg" className="row-container plant-button full-width">
          <IconMeh />
          <h1>Plantssssss</h1>
          <IconChevronRight />
        </Layer>
      </div>
    );
  }
}

export default MoistureDashboard;
