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
    this.height = NaN;

    // emits two events:
    // "change": occurs when change in reading is >= threshold
    // "data"  : occurs at 'freq' interval
    this.sensor.on("data", this.dataCallback.bind(this));
  }

  dataCallback() {
    this.reading = this._convertReading(this.sensor.raw);
    this.volume = this._readingToVolume(this.reading);
    this.height = this._readingToWaterHeight(this.reading);
  }

  getVolume() {
    return this.volume;
  }

  getHeight() {
    return this.height;
  }

  _convertReading(reading) {
    console.log(reading);
    const SERIES_RESISTANCE = 560;
    let resistance = SERIES_RESISTANCE / (1023 / reading - 1);
    return resistance;
  }

  _readingToVolume(reading) {
    const conversionSlope = -4.10277995;
    const conversionConstant = 10412.28946;

    return conversionSlope * reading + conversionConstant;
  }

  _readingToWaterHeight(reading) {
    const conversionSlope = -0.006242809;
    const conversionConstant = 16.15406741;

    return conversionSlope * reading + conversionConstant;
  }
};
