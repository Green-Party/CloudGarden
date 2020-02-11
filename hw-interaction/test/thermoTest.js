const five = require("johnny-five");
const ThermoSensors = require("../thermo_sensors");

let board = new five.Board();

board.on("ready", () => {
  let thermoSensors = new ThermoSensors();
});
