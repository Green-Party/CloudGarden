/**
 * Creation Date: March 8, 2020
 * Author: Luke Slevinsky
 * A test page for the live stream
 */

import React from "react";
import "../../Dashboard.css";
import JsmpegPlayer from "./JsmpegPlayer";
import { Grid } from "@material-ui/core";

const TestNotificationView: React.FC = () => {
  const videoOptions = {
    poster:
      "https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg"
  };

  const videoOverlayOptions = {};

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <JsmpegPlayer
        wrapperClassName="video-wrapper video"
        options={videoOptions}
        overlayOptions={videoOverlayOptions}
        videoUrl={`ws://localhost:8082/`} //${document.location.hostname}
      />
    </Grid>
  );
};

export default TestNotificationView;
