const Pump = require("./pump");
const WaterLevelSwitch = require("./water_level_switch");

module.exports = class Pumps {
  /**
   *
   * @param {*} options pins, type, enabled
   */
  constructor(options) {
    const DEFAULT_PINS = [3, 4, 5];
    const DEFAULT_TYPE = "NO";

    let opts = options || {};
    let pins = opts.hasOwnProperty("pins") ? opts.pins : DEFAULT_PINS;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;

    this.enabled = opts.hasOwnProperty("enabled") ? opts.enabled : true;
    this.controls = pins.map((pin, idx, arr) => {
      return new Pump({
        pin: pin,
        type: type,
        number: idx + 1,
        enabled: enabled
      });
    });
  }

  turnOn(idx) {
    if (this.enabled) {
      this.controls[idx].turnOn();
    }
  }

  turnOff(idx) {
    this.controls[idx].turnOff();
  }

  enable() {
    this.enabled = true;
    this.controls.map(pump => {
      pump.enable();
    });
  }

  disable() {
    this.enabled = false;
    this.controls.map(pump => {
      pump.disable();
    });
  }
};
