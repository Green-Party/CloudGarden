/**
 * Creation Date: February 20, 2020
 * Author: Logan McDonald
 * Tests the water level ruler
 */

const testHelper = require("./test_helper");
const WaterLevelRuler = require("../water_level_ruler");

function waterRulerTest() {
  let waterLevelRuler = new WaterLevelRuler();
  setInterval(() => {
    let reading = waterLevelRuler.getReading();
    let volume = waterLevelRuler.getVolume();
    let height = waterLevelRuler.getHeight();
    console.log(`Resistance: ${reading}`);
    console.log(`Volume: ${volume}`);
    console.log(`Water height: ${height}`);
    console.log();
  }, 1000);
}

testHelper.runTest(waterRulerTest);
