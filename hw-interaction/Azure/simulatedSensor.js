/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Mock sensor for testing the Azure connection
 * Adapted from: https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/blob/master/simulatedSensor.js
 */
"use strict";

class Sensor {
  constructor(/* options */) {
    // nothing todo
  }
  init(callback) {
    // nothing todo
    callback();
  }
  read(callback) {
    callback(null, {
      temperature: random(20, 30),
      humidity: random(60, 80)
    });
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Sensor;
