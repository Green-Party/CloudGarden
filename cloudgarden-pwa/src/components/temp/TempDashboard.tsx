/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { useState, Fragment } from "react";
import "../../Dashboard.css";
import PercentChart from "../charts/PercentChart";
import HistoryChart from "../charts/HistoryChart";
import { Link, useRouteMatch, Route } from "react-router-dom";
import UnitToggle from "./UnitToggle";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  CardMedia,
  Typography,
  GridListTile,
  GridList
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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

const TempDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const match = useRouteMatch();
  const styles = useStyles();
  const TempChart: React.FC = () => {
    const [units, setUnits] = useState<string>("celsius");
    const [temp, setTemp] = useState<number>(20);

    const handleUnits = (
      event: React.MouseEvent<HTMLElement>,
      newUnits: string
    ) => {
      console.log(units, newUnits);
      if (newUnits != units && newUnits != null) {
        setUnits(newUnits);
        let newTemp = temp;
        if (newUnits == "celsius") {
          newTemp = ((temp - 32) * 5) / 9;
        } else if (newUnits == "ferinheight") {
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
          <PercentChart percent={temp} />
          <ToggleButtonGroup
            value={units}
            exclusive
            onChange={handleUnits}
            aria-label="temp units"
          >
            <ToggleButton value="celsius" aria-label="celsius">
              ℃
            </ToggleButton>
            <ToggleButton value="ferinheight" aria-label="ferinheight">
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
          <HistoryChart
            width={800}
            height={400}
            data={[
              { date: new Date("June 12, 2015"), value: 10 },
              { date: new Date("June 15, 2015"), value: 15 },
              { date: new Date("June 18, 2015"), value: 10 },
              { date: new Date("June 21, 2015"), value: 20 },
              { date: new Date("June 23, 2015"), value: 30 },
              { date: new Date("June 25, 2015"), value: 25 },
              { date: new Date("June 28, 2015"), value: 18 },
              { date: new Date("June 30, 2015"), value: 15 }
            ]}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <GridList cellHeight="auto" className={styles.gridList} cols={3}>
      <GridListTile cols={2}>
        <TempChart />
      </GridListTile>
      <GridListTile cols={3}>
        <HistoryGraph />
      </GridListTile>
    </GridList>
  );
};

export default TempDashboard;
