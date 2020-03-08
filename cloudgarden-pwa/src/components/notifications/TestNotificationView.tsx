/**
 * Creation Date: March 7, 2020
 * Author: Luke Slevinsky
 * A test page for notifications
 */

import React, { useState, useEffect } from "react";
import "../../Dashboard.css";
import List from "./List";
import { useSensorDataState } from "../../contexts";

const TestNotificationView: React.FC = () => {
  const { notifications } = useSensorDataState();
  console.log("notifications");
  console.log(notifications);
  console.log(notifications.length);

  return (
    <div className="moisture-dashboard column-container">
      <List data={notifications} />
    </div>
  );
};

export default TestNotificationView;
