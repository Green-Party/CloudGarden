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
  const onClickSendCommand = () => {
    currentSocket.emit("toggleLight", true);
  };

  useEffect(() => {
    console.log("connecting client socket");
    const socket = socketIOClient();
    setCurrentSocket(socket);
    socket.on("lightToggled", (data: boolean) => setLightState(data));
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
        onClick={onClickSendCommand}
      >
        Send
      </Button>
    </div>
  );
};

export default TestControlDashboard;
