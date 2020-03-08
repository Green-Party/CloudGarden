/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React from "react";
import "../../Dashboard.css";
import {
  Card,
  CardContent,
  Divider,
  Button,
  CardMedia,
  Typography,
  GridListTile,
  GridList,
  Grid
} from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import { useSensorState } from "../../contexts";
import { sensorDataToChartData } from "../dashboardUtils";
import HistoryChart from "../charts/HistoryChart";
import PercentChart from "../charts/PercentChart";

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      alignItems: "center",
      textAlign: "center",
      paddingLeft: 8,
      paddingRight: 8,
      margin: 8
    },
    chart: {
      margin: 8,
      flexGrow: 1
    },
    gridList: {
      width: "100%",
      height: "100%"
    }
  })
);

const WaterLevelDashboard: React.FC = () => {
  const sensorData = useSensorState();
  const theme = useTheme();
  const styles = useStyles(theme);

  const waterLevel = sensorData[sensorData.length - 1].water_level;

  const HistoryGraph: React.FC = () => {
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            Water Level
          </Typography>
          <Divider />
          <HistoryChart
            units={SensorUnit.UNITS}
            type={SensorType.WATER_LEVEL}
            data={[sensorDataToChartData(sensorData, SensorType.WATER_LEVEL)]}
          />
        </CardContent>
      </Card>
    );
  };

  interface waterLevelChartProps {
    water_level: number;
  }

  const WaterLevelPercentage: React.FC<waterLevelChartProps> = ({
    water_level
  }: waterLevelChartProps) => {
    const styles = useStyles();
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Water Level
          </Typography>
          <Divider />
          <PercentChart
            value={water_level}
            range={{
              low: SensorRanges[SensorType.WATER_LEVEL].low,
              high: SensorRanges[SensorType.WATER_LEVEL].high,
              ideal: SensorRanges[SensorType.WATER_LEVEL].ideal
            }}
            units={"mL"}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <GridList cellHeight="auto" className={styles.gridList} cols={3}>
      <GridListTile cols={1}>
        <WaterLevelPercentage water_level={waterLevel} />
      </GridListTile>
      <GridListTile cols={2}>
        <HistoryGraph />
      </GridListTile>
    </GridList>
  );
};

export default WaterLevelDashboard;
