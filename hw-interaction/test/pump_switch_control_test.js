/**
 * Creation Date: February 10, 2020
 * Author: Logan McDonald
 * Sets up a button to control pumps
 * Actions to button presses are ordered as follows:
 *
 * Pump 0 on
 * Pump 0 off
 * Pump 1 on
 * Pump 1 off
 * Pump 2 on
 * Pump 2 off
 * Repeat
 */

const testHelper = require("./test_helper");
const Pumps = require("../pumps");
const WaterLevelSwitch = require("../water_level_switch");

var pumps;
var counter = 0;
var pumpOff = true;

function pumpSwitchControlTest() {
  pumps = new Pumps({
    enabled: false
  });

  let waterLevelSwitch = new WaterLevelSwitch({
    slave: pumps
  });

  testHelper.initializeButton(8, pressCallback, releaseCallback);
}

function pressCallback() {
  if (pumpOff) {
    pumps.turnOn(counter);
    pumpOff = false;
  } else {
    pumps.turnOff(counter);
    pumpOff = true;
  }
  if (pumpOff) {
    counter++;
    if (counter > 2) {
      counter = 0;
    }
  }
}

function releaseCallback() {
  console.log("Release");
}

testHelper.runTest(pumpSwitchControlTest);
