/**
 * Creation Date: February 19, 2020
 * Author: Luke Slevinsky
 * A test page for talking with the Pi
 */

import React from "react";
import "../../Dashboard.css";

import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Client } from "azure-iothub";

const TestControlDashboard: React.FC = () => {
  console.log(`con string ${process.env.CONNECTION_STRING}`);
  const client = Client.fromConnectionString(
    process.env.CONNECTION_STRING || ""
  );

  // Set the direct method name, payload, and timeout values
  const methodParams = {
    methodName: "SetBlinkLight",
    payload: true, // Number of seconds.
    responseTimeoutInSeconds: 30
  };

  const deviceId = "RaspberryPi";

  const onClick = () => {
    client.invokeDeviceMethod(deviceId, methodParams, (err, result) => {
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
    });
  };

  return (
    <div className="moisture-dashboard column-container">
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        onClick={onClick}
      >
        Send
      </Button>
    </div>
  );
};

export default TestControlDashboard;
