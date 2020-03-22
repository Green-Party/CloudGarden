/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Tests temperature sensors
 */

const testHelper = require("./test_helper");
const ThermoSensor = require("../thermo_sensor");
const five = require("johnny-five");

function thermoSensorTest() {
  let thermoSensor = new five.Thermometer({
    pin: 2,
    controller: "DS18B20",
    freq: 1000
  });
  thermoSensor.on("data", () => {
    const { address, celsius, fahrenheit, kelvin } = thermoSensor;
    console.log(`Thermometer at address: 0x${address.toString(16)}`);
    console.log("  celsius      : ", celsius);
    console.log("  fahrenheit   : ", fahrenheit);
    console.log("  kelvin       : ", kelvin);
    console.log("--------------------------------------");
  });
}

testHelper.runTest(thermoSensorTest);
