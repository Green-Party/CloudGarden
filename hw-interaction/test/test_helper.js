/**
 * Creation Date: February 10, 2020
 * Author: Logan McDonald
 * Provides helper functions for running tests
 */

const five = require("johnny-five");

module.exports = {
  runTest,
  initializeButton
};

function runTest(callback) {
  let board = new five.Board();
  board.on("ready", callback);
}

function initializeButton(pin, pressCallback, releaseCallback) {
  if (pin) {
    let button = new five.Button({
      pin: pin
    });

    button.on("press", pressCallback);

    button.on("release", releaseCallback);
  }
}
