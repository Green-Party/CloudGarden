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
  GridList
} from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import { useSensorState } from "../../contexts";
import { sensorDataToChartData } from "../dashboardUtils";
import AreaChart from "../charts/AreaChart";

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      background: theme.palette.secondary.dark,
      border: 0,
      borderRadius: 8,
      color: "white",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    card: {
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
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
      textAlign: "center",
      color: theme.palette.primary.dark
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

  return (
    <GridList cellHeight="auto" className={styles.gridList} cols={3}>
      <GridListTile cols={3}>
        <Card className={styles.chart}>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              History
            </Typography>
            <Divider />
            <AreaChart
              units={SensorUnit.UNITS}
              type={SensorType.WATER_LEVEL}
              data={[sensorDataToChartData(sensorData, SensorType.WATER_LEVEL)]}
            />
          </CardContent>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default WaterLevelDashboard;
