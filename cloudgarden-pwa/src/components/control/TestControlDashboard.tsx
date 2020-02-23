/**
 * Creation Date: February 19, 2020
 * Author: Luke Slevinsky
 * A test page for controlling the Pi
 */

import React, { useState, useEffect } from "react";
import "../../Dashboard.css";

import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import socketIOClient from "socket.io-client";

const TestControlDashboard: React.FC = () => {
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
    <div className="moisture-dashboard column-container">
      <Button
        variant="contained"
        color={lightState ? "primary" : "secondary"}
        disabled={buttonDisabled}
        endIcon={<CloudUploadIcon />}
        onClick={onClickLightCommand}
      >
        Light pls
      </Button>

      <Button
        variant="contained"
        color={lightState ? "primary" : "secondary"}
        disabled={buttonDisabled}
        endIcon={<CloudUploadIcon />}
        onClick={() => onClickPumpCommand(1)}
      >
        Pump 1
      </Button>

      <Button
        variant="contained"
        color={lightState ? "primary" : "secondary"}
        disabled={buttonDisabled}
        endIcon={<CloudUploadIcon />}
        onClick={() => onClickPumpCommand(2)}
      >
        Pump 2
      </Button>

      <Button
        variant="contained"
        color={lightState ? "primary" : "secondary"}
        disabled={buttonDisabled}
        endIcon={<CloudUploadIcon />}
        onClick={() => onClickPumpCommand(3)}
      >
        Pump 3
      </Button>
    </div>
  );
};

export default TestControlDashboard;
