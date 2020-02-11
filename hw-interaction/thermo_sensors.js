const ThermoSensor = require("./thermo_sensor");

module.exports = class ThermoSensors {
  constructor(addresses) {
    const DEFAULT_THERMO_ADDRESSES = [
      0x119129d8cf1,
      0x119129606db,
      0x11912c86a76
    ];

    if (!addresses) {
      addresses = DEFAULT_THERMO_ADDRESSES;
    }

    this.sensors = addresses.map((address, idx, arr) => {
      return new ThermoSensor({
        address: address,
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
