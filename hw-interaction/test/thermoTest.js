const five = require("johnny-five");
const thermo = require("../thermo");

let board = new five.Board();

board.on("ready", () => {
  let thermoSensors = thermo.initialize();
});
