/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Message sending class for Azure
 * Adapted from: https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/blob/master/messageProcessor.js
 */
"use strict";

const SimulatedSensor = require("./simulatedSensor.js");

class MessageProcessor {
  constructor(option) {
    option = Object.assign(
      {
        deviceId: "[Unknown device] node",
        temperatureAlert: 30
      },
      option
    );
    this.sensor = new SimulatedSensor();
    //: new Bme280Sensor(option.i2cOption);
    this.deviceId = option.deviceId;
    this.temperatureAlert = option.temperatureAlert;
    this.sensor.init(() => {
      this.inited = true;
    });
  }
  getMessage(messageId, cb) {
    if (!this.inited) {
      return;
    }
    this.sensor.read((err, data) => {
      if (err) {
        console.log("[Sensor] Read data failed due to:\n\t" + err.message);
        return;
      }
      cb(
        JSON.stringify({
          messageId: messageId,
          deviceId: this.deviceId,
          temperature: data.temperature,
          humidity: data.humidity
        }),
        data.temperature > this.temperatureAlert
      );
    });
  }
}

module.exports = MessageProcessor;
