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
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "100%",
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
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
  }
});

const MoistureDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const match = useRouteMatch();

  const PlantButtons: React.FC = () => {
    const styles = useStyles();
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
          <Typography variant={"h6"} gutterBottom>
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
    <div className="moisture-dashboard column-container">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <MoisturePercentage />
        </Grid>
        <Grid item xs={12} md={8}>
          <HistoryGraph />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <PlantButtons />
      </Grid>
    </div>
  );
};

export default MoistureDashboard;
