/**
 * Creation Date: January 27, 2020
 * Author: Luke Slevinsky
 * Backend server that serves the react front end
 * Based off of: https://create-react-app.dev/docs/deployment/
 *   and https://socket.io/docs/https://socket.io/docs/
 */
"use strict";

//Requires
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
const path = require("path");
const chalk = require("chalk");
const logger = require("morgan");
const open = require("open");
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const webPush = require("web-push");
const { spawn } = require("child_process");

const Notification = require("./hw-interaction/Azure/notification");
const Sensors = require("./hw-interaction/sensors");
const Azure = require("./hw-interaction/Azure/communication");
const CONSTANTS = require("./constants");
const { NODE_COMMAND, STREAM_RELAY, SECRET } = CONSTANTS;

require("dotenv").config();

// Static Routes
// Serve production build of React app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(logger("dev")); // logging
app.use(express.static(path.join(__dirname, "cloudgarden-pwa", "build")));
app.use(express.urlencoded({ extended: false }));

webPush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

//Main App Route
app.get("/*", (_req, res, _next) =>
  res.sendFile(path.join(__dirname, "cloudgarden-pwa", "build", "index.html"))
);

app.post("/notifications/subscribe", (req, res) => {
  global.pushSubscription = req.body;

  const payload = {
    title: "Subscribed",
    body: "Successfully subscribed to push notifications."
  };

  Notification.sendNotification(payload);
  res.status(200).json({ success: true });
});

const port = 9000;

//Run Server
server.listen(process.env.PORT || port, async () => {
  console.log(
    chalk.blueBright(`Listening intently on port http://localhost:${port}`)
  );
  await open(`http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // console.error("ERROR ALERT");
  // console.log(err);
  res.status(err.status || 500).send("error");
});

// Setup sensors
let sensorData = {};
Sensors.initialize(sensorData);

// Setup Sockets

io.on("connection", socket => {
  socket.on("toggleLight", data => {
    console.log(`Toggling light prev state:${data}`);
    const lightState = Sensors.toggleLight();
    console.log(`Toggling light new state:${lightState}`);
    io.emit("lightToggled", lightState);
  });
  socket.on("togglePump", async idx => {
    console.log(`Toggling pump ${idx}`);
    await Sensors.runPump(idx);
    io.emit("pumpToggled", true);
  });
  socket.on("updateMoistureThreshold", ({ isOn, threshold }) => {
    console.log(`Moisture threshold ${isOn}: ${threshold}`);
    Sensors.configureSoilMoistureAutomation(isOn, threshold);
    io.emit("moistureThresholdUpdated", isOn);
  });
  socket.on("updateLight", ({ isOn, timeOfDayStart, timeOfDayEnd }) => {
    console.log(`Update Light ${isOn}: ${timeOfDayStart} - ${timeOfDayEnd}`);
    Sensors.configureLightAutomation(isOn, timeOfDayStart, timeOfDayEnd);
    io.emit("lightUpdated", isOn);
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Setup Azure
Azure.setupClient(process.env.DEVICE_CONNECTION_STRING, sensorData);

// Setup the streaming relay
const streamRelay = spawn(NODE_COMMAND, [STREAM_RELAY, SECRET]);

streamRelay.stdout.on("data", data => {
  console.log(`relay stdout: ${data}`);
});
streamRelay.stderr.on("data", data => {
  console.error(`relay stderr: ${data}`);
});
streamRelay.on("close", code => {
  console.log(`relay child process exited with code ${code}`);
});

module.exports = app;
