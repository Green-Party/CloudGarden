/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { useState } from "react";
import "../../Dashboard.css";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  GridListTile,
  GridList
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PercentChartNew from "../charts/PercentChartNew";
import HistoryChartNew from "../charts/HistoryChartNew";
import { SensorUnit, SensorType, SensorRanges } from "../charts/Units";
import { useSensorDataState } from "../../contexts";
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
  },
  temp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  gridList: {
    width: "100%",
    height: "100%"
  }
});

interface TemperatureChartProps {
  temperature: number;
}

const TemperatureDashboard: React.FC = () => {
  const styles = useStyles();
  const { sensorData } = useSensorDataState();

  const temperature1 = sensorData[sensorData.length - 1].temperature[0];
  const temperature2 = sensorData[sensorData.length - 1].temperature[1];
  const temperature3 = sensorData[sensorData.length - 1].temperature[2];

  const TemperatureChart: React.FC<TemperatureChartProps> = ({
    temperature
  }: TemperatureChartProps) => {
    const [units, setUnits] = useState<SensorUnit>(SensorUnit.CELSIUS);
    const [temp, setTemp] = useState<number>(temperature);

    const handleUnits = (
      _event: React.MouseEvent<HTMLElement>,
      newUnits: SensorUnit
    ) => {
      console.log(units, newUnits);
      if (newUnits !== units && newUnits !== null) {
        setUnits(newUnits);
        let newTemp = temp;
        if (newUnits === SensorUnit.CELSIUS) {
          newTemp = ((temp - 32) * 5) / 9;
        } else if (newUnits === SensorUnit.FERINHEIGHT) {
          newTemp = (temp * 9) / 5 + 32;
        }
        setTemp(newTemp);
      }
    };

    return (
      <Card className={styles.chart}>
        <CardContent className={styles.temp}>
          <Typography variant={"h6"} gutterBottom>
            Temperature
          </Typography>
          <Divider />
          <PercentChartNew
            value={temp}
            range={{
              low: SensorRanges[SensorType.TEMPERATURE][units].low,
              high: SensorRanges[SensorType.TEMPERATURE][units].high,
              ideal: SensorRanges[SensorType.TEMPERATURE][units].ideal
            }}
            units={units === SensorUnit.CELSIUS ? "℃" : "℉"}
          />
          <ToggleButtonGroup
            value={units}
            exclusive
            onChange={handleUnits}
            aria-label="temp units"
          >
            <ToggleButton value={SensorUnit.CELSIUS} aria-label="celsius">
              ℃
            </ToggleButton>
            <ToggleButton
              value={SensorUnit.FERINHEIGHT}
              aria-label="ferinheight"
            >
              ℉
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>
    );
  };

  const HistoryGraph: React.FC = () => {
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            History
          </Typography>
          <Divider />
          <HistoryChartNew
            units={SensorUnit.UNITS}
            type={SensorType.TEMPERATURE}
            data={[
              sensorDataToChartData(sensorData, SensorType.TEMPERATURE, 0),
              sensorDataToChartData(sensorData, SensorType.TEMPERATURE, 1),
              sensorDataToChartData(sensorData, SensorType.TEMPERATURE, 2)
            ]}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <GridList cellHeight="auto" className={styles.gridList} cols={3}>
      <GridListTile cols={1}>
        <TemperatureChart temperature={temperature1} />
      </GridListTile>
      <GridListTile cols={1}>
        <TemperatureChart temperature={temperature2} />
      </GridListTile>
      <GridListTile cols={1}>
        <TemperatureChart temperature={temperature3} />
      </GridListTile>
      <GridListTile cols={3}>
        <HistoryGraph />
      </GridListTile>
    </GridList>
  );
};

export default TemperatureDashboard;
