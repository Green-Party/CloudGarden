/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Message sending class for Azure
 * Adapted from: https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/blob/master/messageProcessor.js
 */
"use strict";

const SimulatedSensor = require("./simulatedSensor.js");
const RealSensors = require("./realSensors.js");

class MessageProcessor {
  constructor(option) {
    option = Object.assign(
      {
        deviceId: "[Unknown device] node"
      },
      option
    );
    this.sensor = option.simulatedData
      ? new SimulatedSensor()
      : new RealSensors(option.sensorData);

    this.deviceId = option.deviceId;
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
      let sensorData = {
        type: "Sensor",
        messageId: messageId,
        deviceId: this.deviceId
      };

      sensorData = Object.assign(data, sensorData);

      cb(JSON.stringify(sensorData));
    });
  }
}

module.exports = MessageProcessor;
