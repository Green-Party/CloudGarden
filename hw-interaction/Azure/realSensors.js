/**
 * Creation Date: February 9, 2020
 * Author: Luke Slevinsky
 * Real sensor object that takes sensor readings object and sends data to the cloud
 */
"use strict";

class Sensor {
  constructor(sensorData) {
    this.sensorData = sensorData;
  }
  init(callback) {
    // nothing todo
    callback();
  }
  read(callback) {
    callback(null, this.sensorData);
  }
}
module.exports = Sensor;
