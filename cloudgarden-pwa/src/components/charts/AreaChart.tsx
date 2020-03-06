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
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea
          interpolation="natural"
          data={[
            { x: 1, y: 2000 },
            { x: 2, y: 3000 },
            { x: 3, y: 500 },
            { x: 4, y: 400 },
            { x: 5, y: 700 }
          ]}
        />
        <VictoryAxis
          scale="time"
          label="time"
          standalone={false}
          // domain={[
          //   new Date(Math.min(...data.flat().map(v => v.timestamp.getTime()))),
          //   new Date(Math.max(...data.flat().map(v => v.timestamp.getTime())))
          // ]}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 4400]}
          orientation="left"
          standalone={false}
          label="Water Level (mL)"
        />
      </VictoryChart>
    </div>
  );
};

export default AreaChart;
