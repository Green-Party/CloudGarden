const Relay = require("./relay");

module.exports = class Pump extends Relay {
  /**
   *
   * @param {*} options pin, type, number, enabled
   */
  constructor(options) {
    super(options);

    let opts = options || {};

    this.enabled = opts.hasOwnProperty("enabled") ? opts.enabled : true;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
};
