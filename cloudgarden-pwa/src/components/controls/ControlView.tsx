/**
 * Creation Date: February 19, 2020
 * Author: Gillian Pierce
 * Component that holds controls for watering the plants
 * and turning on and off the light
 */

import React, { useState, Fragment } from "react";
import {
  Card,
  CardContent,
  Divider,
  Button,
  CardMedia,
  Typography,
  Grid,
  Paper,
  Switch,
  GridList,
  GridListTile,
  useMediaQuery
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import "../../Dashboard.css";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      background: theme.palette.secondary.main,
      border: 0,
      borderRadius: 8,
      color: "white",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&:hover": {
        background: theme.palette.secondary.dark
      }
    },
    card: {
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      textAlign: "center",
      margin: 8,
      color: theme.palette.primary.dark
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
    sun: {
      // margin: theme.spacing(2),
      color: theme.palette.secondary.main
    },
    moon: {
      transform: "rotate(180deg)"
      // margin: theme.spacing(2)
    },
    gridList: {
      width: "100%",
      height: "100%"
    }
  })
);

const ControlView: React.FC = () => {
  const [lightOn, setLightOn] = useState(false);
  const theme = useTheme();
  const styles = useStyles(theme);
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <GridList
      // container
      // direction="column"
      // justify="center"
      // alignItems="center"
      // spacing={4}
      // style={{ marginTop: "16px" }}
      cellHeight="auto"
      className={styles.gridList}
      cols={smallWidth ? 2 : 4}
    >
      <GridListTile cols={2}>
        <Card className={styles.card}>
          {lightOn ? (
            <CardMedia
              className={clsx(styles.media, styles.sun)}
              component={WbSunnyIcon}
            />
          ) : (
            <CardMedia className={styles.media} component={Brightness2Icon} />
          )}
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Light Control</Typography>
            <Typography variant={"h6"} gutterBottom>
              {lightOn ? "Light On" : "Light Off"}
            </Typography>
            <Switch
              checked={lightOn}
              onChange={() => setLightOn(!lightOn)}
              color="secondary"
              size="medium"
            />
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile cols={2}>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={LocalDrinkIcon} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Water Control</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 1
            </Typography>
            <Button className={styles.button}>Water</Button>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile cols={2}>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={LocalDrinkIcon} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Water control</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 2
            </Typography>
            <Button className={styles.button}>Water</Button>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile cols={2}>
        <Card className={styles.card}>
          <CardMedia className={styles.media} component={LocalDrinkIcon} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Water Control</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 3
            </Typography>
            <Button className={styles.button}>Water</Button>
          </CardContent>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default ControlView;
