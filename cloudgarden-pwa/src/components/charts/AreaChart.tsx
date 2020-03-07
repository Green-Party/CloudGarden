/**
 * Creation Date: February 28, 2020
 * Author: Gillian Pierce
 * A template component that displays passed in time series data as a line graph
 */
import React from "react";
import { VictoryChart, VictoryArea, VictoryTheme, VictoryAxis } from "victory";
import { Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SensorType, SensorUnit } from "./Units";

interface Data {
  type: SensorType;
  units: SensorUnit;
  data: { value: number; timestamp: Date }[][];
}

const useStyles = makeStyles({
  chartLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
    marginTop: "-2rem",
    marginLeft: "-2rem"
  },
  container: {
    position: "relative"
  },
  legend: {
    display: "inline-flex",
    verticalAlign: "bottom",
    textAlign: "center"
  }
});

const AreaChart: React.FC<Data> = ({ type, units, data }: Data) => {
  const styles = useStyles();
  const theme = useTheme();
  const colors = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark
  ];

  return (
    <div>
      <svg width="100%" height="100%" viewBox="0 0 450 350">
        <VictoryArea
          interpolation="natural"
          data={[
            { x: 1, y: 2000 },
            { x: 2, y: 3000 },
            { x: 3, y: 500 },
            { x: 4, y: 400 },
            { x: 5, y: 700 }
          ]}
          x="timestamp"
          y="value"
          scale={{ x: "time", y: "linear" }}
          standalone={false}
          style={{
            data: { fill: colors[0] }
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 }
          }}
        />
        <VictoryAxis scale="time" label="time" standalone={false} />
        <VictoryAxis
          dependentAxis
          domain={[0, 4400]}
          orientation="left"
          standalone={false}
          label="Water Level (mL)"
        />
      </svg>
    </div>
  );
};

export default AreaChart;
