/**
 * Creation Date: January 27, 2020
 * Author: Luke Slevinsky
 * Backend server that serves the react front end
 * Based off of: https://create-react-app.dev/docs/deployment/
 */

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
const Sensors = require("./hw-interaction/sensors");
const Azure = require("./hw-interaction/Azure/communication");

require("dotenv").config();

// Static Routes
// Serve production build of React app
app.use(express.static(path.join(__dirname, "cloudgarden-pwa", "build")));
app.use(logger("dev")); // logging
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Main App Route
app.get("/*", (_req, res, _next) =>
  res.sendFile(path.join(__dirname, "cloudgarden-pwa", "build", "index.html"))
);
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
  res.status(err.status || 500);
  res.render("error");
});

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
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Setup sensors
let sensorData = {};
Sensors.initialize(sensorData);

// Setup Azure
Azure.setupClient(process.env.DEVICE_CONNECTION_STRING, sensorData);

module.exports = app;
