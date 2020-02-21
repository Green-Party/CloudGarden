/**
 * Creation Date: February 19, 2020
 * Author: Luke Slevinsky
 * A test page for controlling the Pi
 */

import React from "react";
import "../../Dashboard.css";

import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Client } from "azure-iothub";

const TestControlDashboard: React.FC = () => {
  const onClickSendCommand = () => {};

  return (
    <div className="moisture-dashboard column-container">
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        onClick={onClickSendCommand}
      >
        Send
      </Button>
    </div>
  );
};

export default TestControlDashboard;
