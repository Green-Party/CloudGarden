/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A dashboard component for displaying moisture sensor data
 */

import React, { useState, Fragment } from "react";
import "../../Dashboard.css";
import PercentChart from "../PercentChart";
import { ReactComponent as Cactus } from "../../illustrations/cactus.svg";
import { ReactComponent as Aloe } from "../../illustrations/aloe_vera.svg";
import { ReactComponent as Snake } from "../../illustrations/snake_plant.svg";
import HistoryChart from "../HistoryChart";
import { Link, useRouteMatch, Route } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  CardMedia,
  Typography,
  GridListTile,
  GridList,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";

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

const MoistureDashboard: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));

  const PlantButtons: React.FC = () => {
    return (
      <Fragment>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={Aloe} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Soil Moisture Data</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 1
            </Typography>
            <Button className={styles.button}>View Details</Button>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={Cactus} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Soil Moisture Data</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 2
            </Typography>
            <Button className={styles.button}>View Details</Button>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={Snake} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Soil Moisture Data</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 3
            </Typography>
            <Button className={styles.button}>View Details</Button>
          </CardContent>
        </Card>
      </Fragment>
    );
  };

  const MoisturePercentage: React.FC = () => {
    const styles = useStyles();
    return (
      <Card className={styles.chart}>
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Average Moisture
          </Typography>
          <Divider />
          <PercentChart percent={60} />
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
            width={600}
            height={300}
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
      <GridListTile cols={smallWidth ? 3 : 1}>
        <MoisturePercentage />
      </GridListTile>
      <GridListTile cols={smallWidth ? 3 : 2}>
        <HistoryGraph />
      </GridListTile>
      <GridListTile cols={3}>
        <PlantButtons />
      </GridListTile>
    </GridList>
  );
};

export default MoistureDashboard;
