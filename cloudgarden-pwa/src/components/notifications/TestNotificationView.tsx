/**
 * Creation Date: March 7, 2020
 * Author: Luke Slevinsky
 * A test page for notifications
 */

import React from "react";
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
      <List className={""} data={notifications} onClickDelete={() => {}} />
    </div>
  );
};

export default TestNotificationView;
