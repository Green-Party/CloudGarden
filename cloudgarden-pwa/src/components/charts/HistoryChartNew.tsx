import React from "react";
import { VictoryLine, VictoryAxis } from "victory";
import {
  Typography,
  useTheme,
  GridList,
  GridListTile
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SensorType, SensorUnit } from "./Units";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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

const HistoryChartNew: React.FC<Data> = ({ type, units, data }: Data) => {
  const styles = useStyles();
  const theme = useTheme();
  const colors = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark
  ];

  return (
    <div>
      <GridList cellHeight="auto" cols={data.length}>
        {data.map((value, index) => {
          return (
            <GridListTile cols={1} className={styles.legend}>
              <Typography
                variant="caption"
                align="center"
                className={styles.legend}
              >
                <FiberManualRecordIcon
                  style={{ fill: colors[index], marginTop: 2 }}
                />
                {type} {index === 0 ? "" : index + 1}
              </Typography>
            </GridListTile>
          );
        })}
      </GridList>
      <svg width="100%" height="100%" viewBox="0 0 450 350">
        {/* Add shared independent axis */}
        <VictoryAxis scale="time" standalone={false} />

        {/*
          Add the dependent axis for the first data set.
          Note that all components plotted against this axis will have the same y domain
        */}
        <VictoryAxis
          dependentAxis
          domain={[0, 40]}
          orientation="left"
          standalone={false}
        />
        {data.map((value, index) => {
          return (
            <VictoryLine
              data={value}
              x="timestamp"
              y="value"
              scale={{ x: "time", y: "linear" }}
              standalone={false}
              style={{
                data: { stroke: colors[index] }
              }}
              animate={{
                duration: 1000,
                onLoad: { duration: 1000 }
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default HistoryChartNew;
