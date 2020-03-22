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
  Typography,
  GridListTile,
  GridList,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import PercentChart from "../charts/PercentChart";
import HistoryChart from "../charts/HistoryChart";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import { useSensorDataState } from "../../contexts";
import { sensorDataToChartData } from "../dashboardUtils";

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      background: theme.palette.primary.main,
      border: 0,
      borderRadius: 8,
      color: "white",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&:hover": {
        background: theme.palette.secondary.main
      }
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

interface moistureChartProps {
  soil_moisture: number;
}

const MoistureDashboard: React.FC = () => {
  const { sensorData } = useSensorDataState();
  const theme = useTheme();
  const styles = useStyles(theme);
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));

  const soilMoisture1 = sensorData[sensorData.length - 1].soil_moisture[0];
  const soilMoisture2 = sensorData[sensorData.length - 1].soil_moisture[1];
  const soilMoisture3 = sensorData[sensorData.length - 1].soil_moisture[2];

  const MoisturePercentage: React.FC<moistureChartProps> = ({
    soil_moisture
  }: moistureChartProps) => {
    const styles = useStyles();
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Soil Moisture
          </Typography>
          <Divider />
          <PercentChart
            value={soil_moisture}
            range={{
              low: SensorRanges[SensorType.SOIL_MOISTURE].low,
              high: SensorRanges[SensorType.SOIL_MOISTURE].high,
              ideal: SensorRanges[SensorType.SOIL_MOISTURE].ideal
            }}
            units={""}
          />
        </CardContent>
      </Card>
    );
  };

  const HistoryGraph: React.FC = () => {
    const styles = useStyles();
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            History
          </Typography>
          <Divider />
          <HistoryChart
            units={SensorUnit.UNITS}
            type={SensorType.SOIL_MOISTURE}
            data={[
              sensorDataToChartData(sensorData, SensorType.SOIL_MOISTURE, 0),
              sensorDataToChartData(sensorData, SensorType.SOIL_MOISTURE, 1),
              sensorDataToChartData(sensorData, SensorType.SOIL_MOISTURE, 2)
            ]}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <GridList cellHeight="auto" className={styles.gridList} cols={3}>
      <GridListTile cols={smallWidth ? 3 : 1}>
        <MoisturePercentage soil_moisture={soilMoisture1} />
      </GridListTile>
      <GridListTile cols={smallWidth ? 3 : 1}>
        <MoisturePercentage soil_moisture={soilMoisture2} />
      </GridListTile>
      <GridListTile cols={smallWidth ? 3 : 1}>
        <MoisturePercentage soil_moisture={soilMoisture3} />
      </GridListTile>
      <GridListTile cols={3}>
        <HistoryGraph />
      </GridListTile>
    </GridList>
  );
};

export default MoistureDashboard;
