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
    const VOLUME_CONVERSION_SLOPE = -4.10277995;
    const VOLUME_CONVERSION_CONSTANT = 10412.28946;

    return VOLUME_CONVERSION_SLOPE * reading + VOLUME_CONVERSION_CONSTANT;
  }

  _readingToWaterHeight(reading) {
    const WATER_HEIGHT_CONVERSION_SLOPE = -0.006242809;
    const WATER_HEIGHT_CONVERSION_CONSTANT = 16.15406741;

    return (
      WATER_HEIGHT_CONVERSION_SLOPE * reading + WATER_HEIGHT_CONVERSION_CONSTANT
    );
  }
};
