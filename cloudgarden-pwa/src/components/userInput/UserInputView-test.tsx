/**
 * Creation Date: March 19, 2020
 * Author: Luke Slevinsky
 * Test view to test out user input controlled sensor automation
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  GridList,
  GridListTile,
  useMediaQuery,
} from "@material-ui/core";
import "../../Dashboard.css";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import UserInput from "./UserInput";
import {
  useControlState,
  UPDATE_LIGHT_AUTOMATION,
  UPDATE_MOISTURE_AUTOMATION,
} from "../../contexts";
import { LightAutomationPayload, MoistureAutomationPayload } from "../../types";

const useStyles = makeStyles((theme) =>
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
        background: theme.palette.secondary.dark,
      },
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
      justifyContent: "center",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      textAlign: "center",
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
  })
);

const TestUserInputView: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const [controlState, controlDispatch] = useControlState();
  const [currentSocket, setCurrentSocket]: any = useState(null);

  const updateLightAutomation = (updatedLightState: LightAutomationPayload) => {
    controlDispatch({
      type: UPDATE_LIGHT_AUTOMATION,
      payload: updatedLightState,
    });
  };
  const updateMoistureAutomation = (
    updatedMoistureState: MoistureAutomationPayload
  ) => {
    controlDispatch({
      type: UPDATE_MOISTURE_AUTOMATION,
      payload: updatedMoistureState,
    });
  };

  const onClickLightUpdate = (selectedNumber: number, selectedDate: Date) => {
    currentSocket.emit("updateLight", {
      isOn: true,
      timeOfDay: selectedDate,
      duration: selectedNumber,
    });
  };
  const turnOffLight = () => {
    currentSocket.emit("updateLight", {
      isOn: false,
      threshold: -1,
      timeOfDay: -1,
    });
  };
  const onClickMoistureUpdate = (
    selectedNumber: number,
    _selectedDate: any
  ) => {
    currentSocket.emit("updateMoistureThreshold", {
      isOn: true,
      threshold: selectedNumber,
    });
  };
  const turnOffMoisture = () => {
    currentSocket.emit("updateMoistureThreshold", {
      isOn: false,
      threshold: -1,
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
    <GridList
      cellHeight="auto"
      className={styles.gridList}
      cols={smallWidth ? 2 : 4}
    >
      <GridListTile cols={smallWidth ? 2 : 4}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <UserInput
              type="MOISTURE"
              onSubmit={onClickMoistureUpdate}
              onTurnOff={turnOffMoisture}
              inputState={
                controlState.automationDashboard.moisture.moistureAutomation
              }
              selectedStartTime={null}
              selectedEndTime={null}
              selectedNumber={
                controlState.automationDashboard.moisture.selectedNumber
              }
              updateLightAutomation={updateLightAutomation}
              updateMoistureAutomation={updateMoistureAutomation}
            />
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <UserInput
              type="LIGHT"
              onSubmit={onClickLightUpdate}
              onTurnOff={turnOffLight}
              inputState={
                controlState.automationDashboard.light.lightAutomation
              }
              selectedStartTime={
                controlState.automationDashboard.light.selectedStartTime
              }
              selectedEndTime={
                controlState.automationDashboard.light.selectedEndTime
              }
              selectedNumber=""
              updateLightAutomation={updateLightAutomation}
              updateMoistureAutomation={updateMoistureAutomation}
            />
          </CardContent>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default TestUserInputView;
