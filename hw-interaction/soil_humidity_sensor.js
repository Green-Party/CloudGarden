/**
 * Creation Date: February 7, 2020
 * Author: Logan McDonald
 * Class to represent a soil humidity sensor
 * Extends AnalogSensor class
 */

const AnalogSensor = require("./analog_sensor");

module.exports = class SoilHumiditySensor extends AnalogSensor {
  /**
   *
   * @param {*} options pin, freq, threshold, number
   */
  constructor(options) {
    const DEFAULT_NUMBER = 1;

    super(options);

    let opts = options || {};

    this.number = opts.hasOwnProperty("number") ? opts.number : DEFAULT_NUMBER;

    // emits two events:
    // "change": occurs when change in reading is >= threshold
    // "data"  : occurs at 'freq' interval
    this.sensor.on("data", this.dataCallback);
  }

  dataCallback() {
    let reading = this._convertReading(this.sensor.raw);
    this.reading = reading;
    console.log(`Soil sensor: ${this.number}`);
    console.log(`Reading: ${reading}`);
  }

  _convertReading(reading) {
    // TODO: implement conversion
    // See https://github.com/rwaldron/johnny-five/wiki/Sensor for scaling function if necessary
    return reading;
  }
};
