const testHelper = require("./test_helper");
const Pumps = require("../pumps");
const WaterLevelSwitch = require("../water_level_switch");

module.exports = {
  buttonTest
};

var pumps;
var counter = 0;

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
  if (counter % 2 == 0) {
    for (var i = 0; i < pumps.length(); i++) {
      pumps.turnOn(i);
    }
  } else {
    for (let pump of pumps.controls) {
      pump.turnOn();
    }
  }
  counter++;
}

function pressCallback() {
  for (var i = 0; i < pumps.length(); i++) {
    pumps.turnOff(i);
  }
}

testHelper.runTest(pumpSwitchControlTest);
