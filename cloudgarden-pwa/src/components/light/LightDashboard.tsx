/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { Fragment } from "react";
import "../../Dashboard.css";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PercentChart from "../charts/PercentChart";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import HistoryChart from "../charts/HistoryChart";
import { useSensorState } from "../../contexts";
import { sensorDataToChartData } from "../dashboardUtils";

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
  const theme = useTheme();

  const UVPercentage: React.FC = () => {
    const styles = useStyles();
    const lastUvIdx = sensorData[sensorData.length - 1].uv_index;
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            UV Index
          </Typography>
          <Divider />
          <PercentChart
            value={lastUvIdx}
            range={{
              low: SensorRanges[SensorType.UV_INDEX].low,
              high: SensorRanges[SensorType.UV_INDEX].high,
              ideal: SensorRanges[SensorType.UV_INDEX].ideal
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
          <PercentChart
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
          <PercentChart
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

    console.log(
      "uv Chart Sensor data",
      sensorDataToChartData(sensorData, SensorType.UV_INDEX)
    );
    return (
      <Fragment>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              UV Index History
            </Typography>
            <Divider />
            <HistoryChart
              units={SensorUnit.UNITS}
              type={SensorType.UV_INDEX}
              data={[sensorDataToChartData(sensorData, SensorType.UV_INDEX)]}
            />
          </CardContent>
        </Card>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Visible History
            </Typography>
            <Divider />
            <HistoryChart
              units={SensorUnit.UNITS}
              type={SensorType.VISIBLE}
              data={[sensorDataToChartData(sensorData, SensorType.VISIBLE)]}
            />
          </CardContent>
        </Card>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Infared History
            </Typography>
            <Divider />
            <HistoryChart
              units={SensorUnit.UNITS}
              type={SensorType.IR}
              data={[sensorDataToChartData(sensorData, SensorType.IR)]}
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
