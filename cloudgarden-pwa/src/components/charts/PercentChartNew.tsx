import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export enum SensorType {
  TEMP = "TEMP",
  MOISTURE = "MOISTURE",
  UVINDEX = "UVINDEX",
  IR = "IR",
  VISIBLE = "VISIBLE",
  WATER = "WATER"
}

export enum SensorUnit {
  CELSIUS = "CELSIUS",
  FERINHEIGHT = "FERINHEIGHT",
  UNITS = "UNITS"
}

interface SensorRangesType {
  [identifier: string]: any;
}

const SensorRanges: SensorRangesType = {
  TEMP: {
    CELSIUS: {
      low: 0,
      high: 100,
      ideal: 50
    },
    FERINHEIGHT: {
      low: 32,
      high: 212,
      ideal: 122
    }
  },
  MOISTURE: {
    UNITS: {
      low: 0,
      high: 100,
      ideal: 50
    }
  },
  UVINDEX: {
    UNITS: {
      low: 0,
      high: 100,
      ideal: 50
    }
  },
  IR: {
    UNITS: { low: 0, high: 100, ideal: 50 }
  },
  VISIBLE: {
    UNITS: { low: 0, high: 100, ideal: 50 }
  },
  WATER: {
    UNITS: { low: 0, high: 100, ideal: 50 }
  }
};

interface Data {
  type: SensorType;
  value: number;
  units: SensorUnit;
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
  }
});

const PercentChartNew: React.FC<Data> = ({ type, value, units }: Data) => {
  const styles = useStyles();
  const theme = useTheme();

  let percent = Math.round(
    ((value - SensorRanges[type][units].low) /
      (SensorRanges[type][units].high - SensorRanges[type][units].low)) *
      100
  );

  let idealPercent = Math.round(
    ((SensorRanges[type][units].ideal - SensorRanges[type][units].low) /
      (SensorRanges[type][units].high - SensorRanges[type][units].low)) *
      100
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
          animate={{
            duration: 1000
          }}
          //cornerRadius={25}
          labels={() => null}
          endAngle={angle}
        />
        <Typography variant="h3" className={styles.chartLabel}>
          {Math.round(value)}
        </Typography>
      </div>
      <Typography variant="subtitle1">
        Ideal: {Math.round(SensorRanges[type][units].ideal)}
      </Typography>
    </div>
  );
};

export default PercentChartNew;
