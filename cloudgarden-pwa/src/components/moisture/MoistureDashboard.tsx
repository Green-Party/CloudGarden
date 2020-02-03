/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { useState } from "react";
import { Layer, IconChevronRight } from "sancho";
import "../../Dashboard.css";
import PercentChart from "../PercentChart";
import GraphIcon from "../GraphIcon";
import { ReactComponent as Cactus } from "../../illustrations/cactus.svg";
import { ReactComponent as Aloe } from "../../illustrations/aloe_vera.svg";
import { ReactComponent as Snake } from "../../illustrations/snake_plant.svg";
import HistoryChart from "../HistoryChart";

const MoistureDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="moisture-dashboard column-container">
      {open ? (
        <HistoryChart
          width={800}
          height={400}
          data={[
            { date: new Date("June 12, 2015"), value: 10 },
            { date: new Date("June 15, 2015"), value: 15 },
            { date: new Date("June 18, 2015"), value: 10 },
            { date: new Date("June 21, 2015"), value: 20 },
            { date: new Date("June 23, 2015"), value: 30 },
            { date: new Date("June 25, 2015"), value: 25 },
            { date: new Date("June 28, 2015"), value: 18 },
            { date: new Date("June 30, 2015"), value: 15 }
          ]}
        />
      ) : (
        <div className="row-container parent fit-content">
          <Layer
            elevation="lg"
            className="percent-chart-layer column-container-space-around"
            onClick={() => alert("clicked percent")}
          >
            <PercentChart percent={40} />
            <h4>average moisture</h4>
          </Layer>

          <Layer
            elevation="lg"
            className="history-chart-button column-container-space-around"
            onClick={() => setOpen(true)}
          >
            <GraphIcon width="80%" height="90%" color="#45b649" />
            <h4 className="inline">see history</h4>
          </Layer>
        </div>
      )}
      <Layer
        elevation="lg"
        className="row-container plant-button full-width"
        onClick={() => setOpen(false)}
      >
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
};

export default MoistureDashboard;
