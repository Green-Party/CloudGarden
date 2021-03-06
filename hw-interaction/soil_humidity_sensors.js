/**
 * Creation Date: February 7, 2020
 * Author: Logan McDonald
 * Class to extend the functionality of the SoilHumiditySensor class to multiple objects
 */

const SoilHumiditySensor = require("./soil_humidity_sensor");

module.exports = class SoilHumiditySensors {
  /**
   *
   * @param {*} options pins, freq, threshold
   */
  constructor(options) {
    const DEFAULT_PINS = ["A0", "A5", "A7"];
    const DEFAULT_FREQ = 1000;
    const DEFAULT_THRESHOLD = 10;

    let opts = options || {};

    let pins = opts.hasOwnProperty("pins") ? opts.pins : DEFAULT_PINS;
    let freq = opts.hasOwnProperty("freq") ? opts.freq : DEFAULT_FREQ;
    let threshold = opts.hasOwnProperty("threshold")
      ? opts.threshold
      : DEFAULT_THRESHOLD;

    this.sensors = pins.map((pin, idx, arr) => {
      return new SoilHumiditySensor({
        pin: pin,
        freq: freq,
        threshold: threshold,
        number: idx + 1
      });
    });
  }

  getReadings() {
    return this.sensors.map(sensor => {
      return sensor.getReading();
    });
  }
};
