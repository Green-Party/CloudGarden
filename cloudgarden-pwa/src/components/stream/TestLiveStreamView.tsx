/**
 * Creation Date: March 8, 2020
 * Author: Luke Slevinsky
 * A test page for the live stream
 */

import React, { useState, useEffect } from "react";
import "../../Dashboard.css";
import JsmpegPlayer from "./JsmpegPlayer";

const TestNotificationView: React.FC = () => {
  return (
    <div className="moisture-dashboard column-container">
      <JsmpegPlayer
        wrapperClassName={"player"}
        videoUrl={"http://localhost:8082"}
      />
      }
    </div>
  );
};

export default TestNotificationView;
