/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { Fragment } from "react";
import "../../Dashboard.css";
import { SensorState, SensorData } from "../../types";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PercentChartNew from "../charts/PercentChartNew";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import HistoryChartNew from "../charts/HistoryChartNew";
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
          <PercentChartNew
            value={lastUvIdx}
            range={{
              low: SensorRanges[SensorType.UVINDEX].low,
              high: SensorRanges[SensorType.UVINDEX].high,
              ideal: SensorRanges[SensorType.UVINDEX].ideal
            }}
            units={""}
          />
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
          <PercentChartNew
            value={lastVisible}
            range={{
              low: SensorRanges[SensorType.VISIBLE].low,
              high: SensorRanges[SensorType.VISIBLE].high,
              ideal: SensorRanges[SensorType.VISIBLE].ideal
            }}
            units={"nm"}
          />
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
          <PercentChartNew
            value={lastInfared}
            range={{
              low: SensorRanges[SensorType.IR].low,
              high: SensorRanges[SensorType.IR].high,
              ideal: SensorRanges[SensorType.IR].ideal
            }}
            units={"nm"}
          />
        </CardContent>
      </Card>
    );
  };

  const HistoryGraphs: React.FC = () => {
    const styles = useStyles();

    const sensorDataToChartData = (sensorData: SensorData[]) => {
      return sensorData.map(sensor => {
        return {
          timestamp: sensor._ts,
          value: sensor.visible
        };
      });
    };

    console.log("Chart Sensor data", sensorDataToChartData(sensorData));
    return (
      <Fragment>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              UV Index History
            </Typography>
            <Divider />
            <HistoryChartNew
              units={SensorUnit.UNITS}
              type={SensorType.UVINDEX}
              data={[
                [
                  { timestamp: new Date("June 12, 2015"), value: 10 },
                  { timestamp: new Date("June 15, 2015"), value: 15 },
                  { timestamp: new Date("June 18, 2015"), value: 10 },
                  { timestamp: new Date("June 21, 2015"), value: 20 },
                  { timestamp: new Date("June 23, 2015"), value: 30 },
                  { timestamp: new Date("June 25, 2015"), value: 25 },
                  { timestamp: new Date("June 28, 2015"), value: 18 },
                  { timestamp: new Date("June 30, 2015"), value: 15 }
                ]
              ]}
            />
          </CardContent>
        </Card>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Visible History
            </Typography>
            <Divider />
            <HistoryChartNew
              units={SensorUnit.UNITS}
              type={SensorType.VISIBLE}
              data={[sensorDataToChartData(sensorData)]}
            />
          </CardContent>
        </Card>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Infared History
            </Typography>
            <Divider />
            <HistoryChartNew
              units={SensorUnit.UNITS}
              type={SensorType.IR}
              data={[
                [
                  { timestamp: new Date("June 12, 2015"), value: 13 },
                  { timestamp: new Date("June 15, 2015"), value: 20 },
                  { timestamp: new Date("June 18, 2015"), value: 17 },
                  { timestamp: new Date("June 21, 2015"), value: 25 },
                  { timestamp: new Date("June 23, 2015"), value: 15 },
                  { timestamp: new Date("June 25, 2015"), value: 30 },
                  { timestamp: new Date("June 28, 2015"), value: 19 },
                  { timestamp: new Date("June 30, 2015"), value: 14 }
                ]
              ]}
            />
          </CardContent>
        </Card>
      </Fragment>
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
        <HistoryGraphs />
      </Grid>
    </div>
  );
};

export default LightDashboard;
