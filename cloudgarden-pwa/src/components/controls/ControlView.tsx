/**
 * Creation Date: February 19, 2020
 * Author: Gillian Pierce
 * Component that holds controls for watering the plants
 * and turning on and off the light
 */

import React, { useState, useEffect } from "react";
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
import socketIOClient from "socket.io-client";

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
    },
    "@keyframes wave-animation": {
      "0%": { backgroundPosition: "0 102%" },
      "100%": { backgroundPosition: "200px 102%" }
    },
    "@keyframes loading-animation": {
      "0%": { backgroundSize: "100px 0px" },
      "100%": { backgroundSize: "100px 30px" }
    },
    "@keyframes tall-loading-animation": {
      "0%": { backgroundSize: "400px 0px" },
      "100%": { backgroundSize: "400px 200px" }
    },
    "@keyframes tall-wave-animation": {
      "0%": { backgroundPosition: "0 105%" },
      "100%": { backgroundPosition: "400px 105%" }
    },
    wave: {
      backgroundImage: "url(wave.png)",
      textShadow: "0px 0px rgba(255,255,255,0.06)",
      animation: `$wave-animation 1s linear infinite, $loading-animation 10s linear infinite alternate`,
      backgroundSize: "100px 50px",
      backgroundRepeat: "repeat-x",
      opacity: 1,
      backgroundClip: "border-box"
    },
    waveTall: {
      backgroundImage: "url(wave-tall.png)",
      textShadow: "0px 0px rgba(255,255,255,0.06)",
      animation: `$tall-wave-animation 1s linear infinite, $tall-loading-animation 10s linear infinite alternate`,
      backgroundSize: "400px 200px",
      backgroundRepeat: "repeat-x",
      opacity: 1,
      backgroundClip: "border-box"
    }
  })
);

const ControlView: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const [buttonDisabled, setButtonDisable] = useState(false);
  const [lightState, setLightState] = useState(false);
  const [currentSocket, setCurrentSocket]: any = useState(null);
  const onClickLightCommand = () => {
    currentSocket.emit("toggleLight", true);
  };
  const onClickPumpCommand = (idx: number) => {
    currentSocket.emit("togglePump", idx);
  };

  useEffect(() => {
    console.log("connecting client socket");
    const socket = socketIOClient();
    setCurrentSocket(socket);
    socket.on("lightToggled", (data: boolean) => setLightState(data));
    socket.on("pumpToggled", (_data: boolean) => console.log("Pump toggled"));
    return () => {
      //stuff that happens when the component unmounts
      //e.g. close socket connection
      console.log("disconnect");
      socket.disconnect();
    };
  }, []);
  return (
    <GridList
      cellHeight="auto"
      className={styles.gridList}
      cols={smallWidth ? 2 : 4}
    >
      <GridListTile cols={2}>
        <Card className={styles.card}>
          {lightState ? (
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
              {lightState ? "Light On" : "Light Off"}
            </Typography>
            <Switch
              checked={lightState}
              onChange={onClickLightCommand}
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
            <Button
              disabled={buttonDisabled}
              className={clsx(styles.button, styles.wave)}
              onClick={() => onClickPumpCommand(0)}
            >
              Water
            </Button>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile cols={2}>
        <Card className={clsx(styles.card, styles.waveTall)}>
          <CardMedia className={styles.media} component={LocalDrinkIcon} />
          <CardContent className={styles.cardContent}>
            <Typography variant={"overline"}>Water control</Typography>
            <Typography variant={"h6"} gutterBottom>
              Plant 2
            </Typography>
            <Button
              disabled={buttonDisabled}
              className={styles.button}
              onClick={() => onClickPumpCommand(1)}
            >
              Water
            </Button>
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
            <Button
              disabled={buttonDisabled}
              className={styles.button}
              onClick={() => onClickPumpCommand(2)}
            >
              Water
            </Button>
          </CardContent>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default ControlView;