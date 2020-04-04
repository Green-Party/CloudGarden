/**
 * Creation Date: February 28, 2020
 * Author: Gillian Pierce
 * A template component that displays passed in time series data as a percent chart
 */
import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Data {
  value: number;
  range: { low: number; high: number; ideal: number };
  units: string;
}

const useStyles = makeStyles({
  chartLabel: {
    margin: 0,
    position: "absolute",
    top: "48%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2
  },
  container: {
    position: "relative"
  }
});

const PercentChart: React.FC<Data> = ({ value, range, units }: Data) => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = !useMediaQuery("(min-width:400px)");

  let percent = Math.round(
    ((value - range.low) / (range.high - range.low)) * 100
  );

  let idealPercent = Math.round(
    ((range.ideal - range.low) / (range.high - range.low)) * 100
  );

  function getColor() {
    if (Math.abs(percent - idealPercent) <= 10) {
      return theme.palette.primary.main;
    } else if (Math.abs(percent - idealPercent) <= 25) {
      return theme.palette.secondary.main;
    }
    return theme.palette.secondary.dark;
  }

  function getData(percent: number) {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent }
    ];
  }

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setTimeout(() => setAngle(360), 1000);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <VictoryPie
          data={getData(percent)}
          innerRadius={120}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = getColor();
                return datum.x === 1 ? color : "grey";
              }
            }
          }}
          animate={
            mobile
              ? false
              : {
                  duration: 1000
                }
          }
          labels={() => null}
          endAngle={angle}
        />
        <Typography variant="h6" className={styles.chartLabel}>
          {Math.round((value + Number.EPSILON) * 100) / 100}
        </Typography>
      </div>
      <Typography variant="subtitle1">
        {units === "nm" ? <br /> : `Ideal: ${range.ideal} ${units}`}
      </Typography>
    </div>
  );
};

export default PercentChart;
