const AnalogSensor = require("./analog_sensor");

module.exports = class WaterLevelRuler extends AnalogSensor {
  /**
   *
   * @param {*} options pin, freq, threshold
   */
  constructor(options) {
    super(options);

    // emits two events:
    // "change": occurs when change in reading is >= threshold
    // "data"  : occurs at 'freq' interval
    this.sensor.on("data", this.dataCallback);
  }

  dataCallback() {
    let reading = this._convertReading(this.sensor.raw);
    this.reading = reading;
    console.log(`Water Level Reading: ${reading}`);
  }

  _convertReading(reading) {
    // TODO: implement conversion
    // See https://github.com/rwaldron/johnny-five/wiki/Sensor for scaling function if necessary
    return reading;
  }
};
