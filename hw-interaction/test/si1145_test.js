/**
 * Creation Date: February 3, 2020
 * Author: Logan McDonald
 * Tests the SI1145 device
 */

const testHelper = require("./test_helper");
const Si1145 = require("../si1145");

function testSi1145() {
  let si1145 = new Si1145({
    board: board
  });
  si1145.initialize(() => {
    if (si1145.deviceActive()) {
      setInterval(() => {
        if (si1145.deviceActive()) {
          console.log("Getting data...");
          si1145.getDataFromDevice(err => {
            if (!err) {
              console.log(`Visible: ${si1145.device.parameters[0].value}`);
              console.log(`IR: ${si1145.device.parameters[1].value}`);
              console.log(`UVIndex: ${si1145.device.parameters[2].value}`);
            } else {
              console.error(`Error: ${err}`);
            }
          });
        } else {
          console.error("Error: Device not active.");
        }
      }, 1000);
    } else {
      console.error("Error: SI1145 device not found.");
    }
  });
}

testHelper.runTest(testSi1145);
