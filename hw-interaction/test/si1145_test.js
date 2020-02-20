const Si1145 = require("../si1145");
const five = require("johnny-five");

let board = new five.Board();

board.on("ready", () => {
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
      }, 500);
    } else {
      console.error("Error: SI1145 device not found.");
    }
  });
});
