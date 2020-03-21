/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Tests temperature sensors
 */

const testHelper = require("./test_helper");
const ThermoSensors = require("../thermo_sensors");

function thermoSensorTest() {
  const DEFAULT_THERMO_ADDRESSES = [
    0x119129d8cf1,
    0x119129606db,
    0x11912c86a76
    // 0x11912da6e07
  ];
  let thermoSensors = new ThermoSensors(DEFAULT_THERMO_ADDRESSES);
  setInterval(() => {
    thermoSensors.getReadings().map((reading, idx) => {
      console.log(`Thermometer ${idx + 1} reading: ${reading}`);
    });
    console.log();
  }, 1000);
}

testHelper.runTest(thermoSensorTest);
