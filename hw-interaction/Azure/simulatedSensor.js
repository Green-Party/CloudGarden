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
      soil_humidity: random(60, 80),
      pumps_emabled: Math.random() >= 0.5,
      visible: random(200, 300),
      ir: random(200, 300),
      uv: random(1, 9)
    });
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Sensor;
