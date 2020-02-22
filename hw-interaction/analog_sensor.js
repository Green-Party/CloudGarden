/**
 * Creation Date: February 19, 2020
 * Author: Logan McDonald
 * Wrapper class for the johnny-five Sensor class
 * See https://github.com/rwaldron/johnny-five/wiki/Sensor for documentation
 */

const five = require("johnny-five");

module.exports = class AnalogSensor {
  constructor(options) {
    const DEFAULT_PIN = "A3";
    const DEFAULT_FREQ = 1000;
    const DEFAULT_THRESHOLD = 10;

    let opts = options || {};

    this.reading = NaN;

    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let freq = opts.hasOwnProperty("freq") ? opts.freq : DEFAULT_FREQ;
    let threshold = opts.hasOwnProperty("threshold")
      ? opts.threshold
      : DEFAULT_THRESHOLD;

    this.sensor = new five.Sensor({
      pin: pin,
      freq: freq,
      threshold: threshold
    });
  }

  getReading() {
    return this.reading;
  }

  convertReading(reading, high, low, desiredHigh, desiredLow) {
    let factor = (reading - low) / (high - low);
    if (factor < 0) {
      factor = 0;
    } else if (factor > 1) {
      factor = 1;
    }

    return Math.round((1 - factor) * (desiredHigh - desiredLow) + desiredLow);
  }
};
