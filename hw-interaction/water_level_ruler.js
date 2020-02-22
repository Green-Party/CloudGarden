/**
 * Creation Date: February 20, 2020
 * Author: Logan McDonald
 * Class to represent the eTape water level sensor
 * Extends the AnalogSensor class
 * Conversion and calibration code adapted from https://learn.adafruit.com/smart-measuring-cup/calibration
 */

const AnalogSensor = require("./analog_sensor");

module.exports = class WaterLevelRuler extends AnalogSensor {
  /**
   *
   * @param {*} options pin, freq, threshold
   */
  constructor(options) {
    super(options);

    this.volume = NaN;

    // emits two events:
    // "change": occurs when change in reading is >= threshold
    // "data"  : occurs at 'freq' interval
    this.sensor.on("data", this.dataCallback.bind(this));
  }

  dataCallback() {
    this.reading = this._convertReading(this.sensor.raw);
    this.volume = this._readingToVolume(this.reading);
    // console.log(`Water Level Reading: ${this.reading}`);
  }

  getVolume() {
    return this.volume;
  }

  _convertReading(reading) {
    const SERIES_RESISTANCE = 560;
    // console.log(1023 / reading - 1);
    let resistance = SERIES_RESISTANCE / (1023 / reading - 1);
    return resistance;
  }

  _readingToVolume(reading) {
    const ZERO_RESISTANCE = 2248.24;
    const CALIBRATION_RESISTANCE = 1952.63;
    const CALIBRATION_VOLUME = 2700;
    if (
      reading > ZERO_RESISTANCE ||
      ZERO_RESISTANCE - CALIBRATION_RESISTANCE == 0.0
    ) {
      // Stop if the value is above the zero threshold, or no max resistance is set (would be divide by zero).
      return 0.0;
    }
    // Compute scale factor by mapping resistance to 0...1.0+ range relative to maxResistance value.
    let scale =
      (ZERO_RESISTANCE - reading) / (ZERO_RESISTANCE - CALIBRATION_RESISTANCE);
    // Scale maxVolume based on computed scale factor.
    return CALIBRATION_VOLUME * scale;
  }
};
