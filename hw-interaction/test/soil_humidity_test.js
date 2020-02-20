/**
 * Creation Date: February 7, 2020
 * Author: Logan McDonald
 * Tests the soil humidity sensors
 */

const testHelper = require("./testHelper");
const SoilHumiditySensors = require("../soil_humidity_sensors");

function soilHumidityTest() {
  let soilHumiditySensors = new SoilHumiditySensors();
  setInterval(() => {
    soilHumiditySensors.getReadings().map((reading, idx) => {
      console.log(`Soil humidity sensor ${idx + 1} reading: ${reading}`);
    });
  }, 1000);
}

testHelper.runTest(soilHumidityTest);
