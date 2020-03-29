/**
 * Creation Date: March 19, 2020
 * Author: Gillian Pierce
 * TAdapted from TestUserInputView this component allows
 * users to control light and watering automation
 */

import React, { useState, useEffect } from "react";
import { useMediaQuery, Grid } from "@material-ui/core";
import "../../Dashboard.css";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import UserInput from "./UserInput";

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
      color: theme.palette.primary.dark,
      justifyContent: "center"
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      textAlign: "center"
    },
    gridList: {
      width: "100%",
      height: "100%"
    },
    grid: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);

const UserAutomationView: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [currentSocket, setCurrentSocket]: any = useState(null);

  const onClickLightUpdate = (
    _selectedNumber: number,
    selectedStartTime: Date,
    selectedEndTime: Date
  ) => {
    currentSocket.emit("updateLight", {
      isOn: true,
      timeOfDayStart: selectedStartTime,
      timeOfDayEnd: selectedEndTime
    });
  };
  const turnOffLight = () => {
    currentSocket.emit("updateLight", {
      isOn: false,
      threshold: -1,
      timeOfDay: -1
    });
  };
  const onClickMoistureUpdate = (
    selectedNumber: number,
    _selectedStartTime: Date,
    _selectedEndTime: Date
  ) => {
    currentSocket.emit("updateMoistureThreshold", {
      isOn: true,
      threshold: selectedNumber
    });
  };
  const turnOffMoisture = () => {
    currentSocket.emit("updateMoistureThreshold", {
      isOn: false,
      threshold: -1
    });
  };

  useEffect(() => {
    console.log("connecting client socket");
    const socket = socketIOClient();
    setCurrentSocket(socket);
    socket.on("lightUpdated", (data: boolean) =>
      console.log(`light auto toggled ${data}`)
    );
    socket.on("moistureThresholdUpdated", (data: boolean) =>
      console.log(`moisture auto toggled ${data}`)
    );
    return () => {
      //stuff that happens when the component unmounts
      //e.g. close socket connection
      console.log("disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className={styles.grid}
    >
      <Grid item xs={10} sm={5} md={4} className={styles.grid}>
        <UserInput
          type="MOISTURE"
          onSubmit={onClickMoistureUpdate}
          onTurnOff={turnOffMoisture}
        />
      </Grid>
      <Grid item xs={10} sm={5} md={4} className={styles.grid}>
        <UserInput
          type="LIGHT"
          onSubmit={onClickLightUpdate}
          onTurnOff={turnOffLight}
        />
      </Grid>
    </Grid>
  );
};

export default UserAutomationView;
