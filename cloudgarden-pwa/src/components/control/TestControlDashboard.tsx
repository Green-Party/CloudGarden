/**
 * Creation Date: February 19, 2020
 * Author: Luke Slevinsky
 * A test page for talking with the Pi
 */

import React from "react";
import "../../Dashboard.css";

import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { getClient } from "./AzureUtil";

const TestControlDashboard: React.FC = () => {
  const client = getClient();

  // Set the direct method name, payload, and timeout values
  const methodParams = {
    methodName: "SetBlinkLight",
    payload: true, // Number of seconds.
    responseTimeoutInSeconds: 30
  };

  const deviceId = "RaspberryPi";

  const onClick = () => {
    console.log("Clicked on turn on lights");
    client.invokeDeviceMethod(
      deviceId,
      methodParams,
      (err: any, result: any) => {
        if (err) {
          console.error(
            "Failed to invoke method '" +
              methodParams.methodName +
              "': " +
              err.message
          );
        } else {
          console.log(
            "Response from " + methodParams.methodName + " on " + deviceId + ":"
          );
          console.log(JSON.stringify(result, null, 2));
        }
      }
    );
  };

  return (
    <div className="moisture-dashboard column-container">
      <Button
        variant="contained"
        color="primary"
        endIcon={<CloudUploadIcon />}
        onClick={onClick}
      >
        Send
      </Button>
    </div>
  );
};

export default TestControlDashboard;
