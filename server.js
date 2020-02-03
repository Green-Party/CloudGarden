//Requires
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const chalk = require("chalk");
const logger = require("morgan");
const open = require("open");

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
app.listen(process.env.PORT || port, async () => {
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

module.exports = app;
