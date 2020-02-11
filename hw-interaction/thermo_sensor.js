const five = require("johnny-five");

module.exports = class ThermoSensor {
  constructor(address, number, options) {
    const DEFAULT_CONTROLLER = "DS18B20";
    const DEFAULT_PIN = 22;
    const DEFAULT_FREQ = 1000;

    this.number = number;

    let opts = options || {};

    let controller = opts.hasOwnProperty("controller")
      ? opts.controller
      : DEFAULT_CONTROLLER;
    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let freq = opts.hasOwnProperty("freq") ? opts.freq : DEFAULT_FREQ;

    this.sensor = new five.Thermometer({
      address: address,
      controller: controller,
      pin: pin,
      freq: freq
    });

    // available events are
    //"data"  : emitted on freq interval
    //"change": emitted when temperature changes
    this.sensor.on("data", this.defaultEventCallback);
    // this.sensor.on("change", this.defaultEventCallback);
  }

  defaultEventCallback() {
    let address = this.sensor.address;
    let celsius = this.sensor.celsius;
    console.log(`Thermometer number: ${this.number.toString(16)}`);
    console.log(`Thermometer data at address: 0x${address.toString(16)}`);
    console.log("celsius: %d", celsius);
  }
};
