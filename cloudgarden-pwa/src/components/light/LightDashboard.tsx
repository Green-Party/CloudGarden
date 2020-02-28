/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React from "react";
import "../../Dashboard.css";
import PercentChart from "../charts/PercentChart";
import HistoryChart from "../charts/HistoryChart";
import { SensorState, SensorData } from "../../types";

import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSensorState } from "../../contexts";

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(to right, #45b649, #a8e063)",
    border: 0,
    borderRadius: 8,
    color: "white",
    height: 24,
    padding: "0 30px"
  },
  card: {
    width: "100%",
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    overflow: "initial",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    margin: 8
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    textAlign: "center"
  },
  media: {
    flexShrink: 0,
    width: "20%",
    height: "20%",
    marginLeft: "auto",
    marginRight: 8,
    padding: "2%"
  },
  chart: {
    margin: 8
  }
});

const LightDashboard: React.FC = () => {
  const sensorData = useSensorState();
  console.log(`sensor data`);
  console.log(sensorData);

  const UVPercentage: React.FC = () => {
    const styles = useStyles();
    const lastUvIdx = sensorData[sensorData.length - 1].uvIdx;
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            UV Index
          </Typography>
          <Divider />
          <PercentChart percent={lastUvIdx} />
        </CardContent>
      </Card>
    );
  };

  const VisiblePercentage: React.FC = () => {
    const styles = useStyles();
    const lastVisible = sensorData[sensorData.length - 1].visible;
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Visible Intensity
          </Typography>
          <Divider />
          <PercentChart percent={lastVisible} />
        </CardContent>
      </Card>
    );
  };

  const InfraredPercentage: React.FC = () => {
    const styles = useStyles();
    const lastInfared = sensorData[sensorData.length - 1].ir;
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Infrared Index
          </Typography>
          <Divider />
          <PercentChart percent={lastInfared} />
        </CardContent>
      </Card>
    );
  };

  const HistoryGraph: React.FC = () => {
    const styles = useStyles();

    const sensorDataToChartData = (sensorData: SensorData[]) => {
      return sensorData.map(sensor => {
        return {
          date: sensor._ts,
          value: sensor.visible
        };
      });
    };

    console.log("Chart Sensor data", sensorDataToChartData(sensorData));
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            History of Visible
          </Typography>
          <Divider />
          <HistoryChart
            width={800}
            height={400}
            data={sensorDataToChartData(sensorData)}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="moisture-dashboard column-container">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}>
          <UVPercentage />
        </Grid>
        <Grid item xs={12} sm={4}>
          <VisiblePercentage />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfraredPercentage />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <HistoryGraph />
      </Grid>
    </div>
  );
};

export default LightDashboard;
