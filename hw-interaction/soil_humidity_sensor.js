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
    this.sensor.on("data", this.dataCallback.bind(this));
  }

  dataCallback() {
    let reading = this._convertReading(this.sensor.raw);
    this.reading = reading;
    // console.log(`Soil sensor: ${this.number}`);
    // console.log(`Reading: ${reading}`);
  }

  _convertReading(reading) {
    // high value occurs 635 (dry)
    // low value occurs 320 (wet)
    const LOW = 315;
    const HIGH = 635;
    const DESIRED_HIGH = 10;
    const DESIRED_LOW = 1;

    return super.convertReading(reading, HIGH, LOW, DESIRED_HIGH, DESIRED_LOW);
  }
};
