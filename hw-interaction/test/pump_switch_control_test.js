/**
 * Creation Date: February 10, 2020
 * Author: Logan McDonald
 * Tests water level switch control of all water pumps
 */

const testHelper = require("./test_helper");
const Pumps = require("../pumps");
const WaterLevelSwitch = require("../water_level_switch");

var pumps;
var counter = 0;

function pumpSwitchControlTest() {
  pumps = new Pumps({
    enabled: false
  });

  // pumps = new Pumps();

  let waterLevelSwitch = new WaterLevelSwitch({
    slave: pumps
  });

  testHelper.initializeButton(8, pressCallback, releaseCallback);
}

function pressCallback() {
  if (counter % 2 == 0) {
    pumps.turnOn();
  } else {
    for (let pump of pumps.controls) {
      pump.turnOn();
    }
  }
  counter++;
}

function releaseCallback() {
  pumps.turnOff();
}

testHelper.runTest(pumpSwitchControlTest);
