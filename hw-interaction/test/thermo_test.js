/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Tests temperature sensors
 */

const testHelper = require("./testHelper");
const ThermoSensors = require("../thermo_sensors");

function thermoSensorTest() {
  let thermoSensors = new ThermoSensors();
  setInterval(() => {
    thermoSensors.getReadings().map((reading, idx) => {
      console.log(`Thermometer ${idx + 1} reading: ${reading}`);
    });
  }, 1000);
}

testHelper.runTest(thermoSensorTest);
