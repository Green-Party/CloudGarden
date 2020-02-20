/**
 * Creation Date: February 20, 2020
 * Author: Logan McDonald
 * Tests the water level ruler
 */

const testHelper = require("./testHelper");
const WaterLevelRuler = require("../water_level_ruler");

function waterRulerTest() {
  let waterLevelRuler = new WaterLevelRuler();
  setInterval(() => {
    let reading = waterLevelRuler.getReading();
    console.log(`Water level reading: ${reading}`);
  }, 1000);
}

testHelper.runTest(waterRulerTest);
