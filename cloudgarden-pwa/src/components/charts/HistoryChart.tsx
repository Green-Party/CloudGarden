/**
 * Creation Date: February 28, 2020
 * Author: Gillian Pierce
 * A template component that displays passed in time series data as a line graph
 */
import React, { useState, useEffect } from "react";
import { VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import {
  Chip,
  Paper,
  Typography,
  GridList,
  GridListTile
} from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import { SensorType, SensorUnit } from "./Units";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

type DataPoints = { value: number; timestamp: Date }[][];
interface Data {
  type: SensorType;
  units: SensorUnit;
  data: DataPoints;
}

interface FilterProps {
  data: DataPoints;
}

const TODAYS_DATA = "TODAYS DATA";
interface ChipData {
  key: number;
  label: string;
  selected: boolean;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: theme.spacing(0.5)
    },
    chip: {
      margin: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.light
    },
    selectedChip: {
      margin: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)"
    },
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
  })
);

const HistoryChart: React.FC<Data> = ({ type, units, data }: Data) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [filters, setFilters] = useState<string[]>([]);
  const colors = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark
  ];

  const filterData = (raw_data: DataPoints) => {
    const idx = filters.indexOf(TODAYS_DATA.toLowerCase());
    debugger;
    if (idx > -1) {
      raw_data = raw_data.map(row => {
        return row.filter(datapoint => {
          const start = new Date();
          start.setHours(0, 0, 0, 0);
          return datapoint.timestamp > start;
        });
      });
    }
    return raw_data;
  };

  const FilterChipsArray: React.FC<FilterProps> = ({ data }) => {
    const classes = useStyles();
    const [chipData, setChipData] = useState<ChipData[]>([
      { key: 0, label: TODAYS_DATA.toLowerCase(), selected: false }
    ]);

    const updateFiltersOnClick = async ({ key, label, selected }: ChipData) => {
      setFilters((oldFilters: string[]) => {
        let newFilters = Array.from(oldFilters);
        const foundIdx = newFilters.indexOf(label);
        if (foundIdx > -1) {
          newFilters.splice(foundIdx, 1);
        } else {
          newFilters.push(label);
        }
        return newFilters;
      });
    };

    useEffect(
      () =>
        setChipData((oldChipData: ChipData[]) => {
          let newChipData = Array.from(oldChipData);
          if (data.length < 2) return newChipData;

          data.forEach((_series, idx) => {
            let chip = oldChipData.find(
              (cd: ChipData) => cd.label === idx.toString()
            );
            if (chip === undefined) {
              newChipData.push({
                key: newChipData.length,
                label: `${type.toLowerCase().replace(/_/g, " ")} ${idx + 1}`,
                selected: true
              });
            }
          });
          return newChipData;
        }),
      []
    );

    useEffect(() => {
      setChipData((oldChipData: ChipData[]) => {
        let newChipData = Array.from(oldChipData);
        filters.forEach(label => {
          let chipIdx = newChipData.findIndex(
            (cd: ChipData) => cd.label === label
          );
          if (chipIdx > -1) {
            newChipData[chipIdx].selected = !newChipData[chipIdx].selected;
          }
        });
        return newChipData;
      });
    }, [filters]);

    return (
      <Paper className={classes.root}>
        <Typography variant={"overline"}>Filters: </Typography>
        {chipData.map((data: ChipData) => {
          return (
            <Chip
              key={data.key}
              label={data.label}
              onClick={() => updateFiltersOnClick(data)}
              className={data.selected ? classes.selectedChip : classes.chip}
            />
          );
        })}
      </Paper>
    );
  };

  data = filterData(data);

  return (
    <div>
      <FilterChipsArray data={data} />
      <GridList cellHeight="auto" cols={data.length}>
        {data.map((_value, index) => {
          return (
            <GridListTile cols={1} className={styles.legend} key={index}>
              <Typography
                variant="caption"
                align="center"
                className={styles.legend}
              >
                <FiberManualRecordIcon
                  style={{ fill: colors[index], marginTop: 2 }}
                />
                {type.toLowerCase().replace(/_/g, " ")}{" "}
                {index === 0 && data.length === 1 ? "" : index + 1}
              </Typography>
            </GridListTile>
          );
        })}
      </GridList>
      <svg width="100%" height="100%" viewBox="0 0 450 350">
        {/* Add shared independent axis */}

        <VictoryAxis
          scale="time"
          label="Time"
          standalone={false}
          domain={[
            new Date(Math.min(...data.flat().map(v => v.timestamp.getTime()))),
            new Date(Math.max(...data.flat().map(v => v.timestamp.getTime())))
          ]}
        />

        {/*
          Add the dependent axis for the first data set.
          Note that all components plotted against this axis will have the same y domain
        */}
        <VictoryAxis
          dependentAxis
          domain={[0, Math.max(...data.flat().map(v => v.value))]}
          orientation="left"
          standalone={false}
          axisLabelComponent={<VictoryLabel dy={-10} />}
          label={`${type.toLowerCase().replace(/_/g, " ")}`}
        />
        {data.map((value, index) => {
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            !filters.includes(
              `${type.toLowerCase().replace(/_/g, " ")} ${index + 1}`
            )
          ) {
            debugger;
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
          }
        })}
      </svg>
    </div>
  );
};

export default HistoryChart;
