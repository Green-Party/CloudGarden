/**
 * Creation Date: February 5, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { useState, Fragment } from "react";
import "../../Dashboard.css";
import PercentChartNew from "../charts/PercentChartNew";
import HistoryChartNew from "../charts/HistoryChartNew";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from "@material-ui/core";

const PlantSpecific: React.FC = () => {
  return (
    <Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Card className="percent-card">
            <CardHeader title="Moisture" />
            <Divider />
            <CardContent>{/* <PercentChart percent={60} /> */}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card className="percent-card">
            <CardHeader title="History" />
            <Divider />
            <CardContent>
              {/* <HistoryChart
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
              /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PlantSpecific;
