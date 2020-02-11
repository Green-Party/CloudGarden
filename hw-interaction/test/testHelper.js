const five = require("johnny-five");

module.exports = {
  runTest,
  initializeButton
};

function runTest(callback) {
  let board = new five.Board();
  board.on("ready", callback);
}

function initializeButton(pin, pressCallback, releaseCallback) {
  if (pin) {
    let button = new five.Button({
      pin: pin
    });

    button.on("press", pressCallback);

    button.on("release", releaseCallback);

    // // led.on() == led.close()
    // button.on("press", () => {
    //   console.log("press");
    //   led.on();
    //   pump.on();
    //   console.log(led.isOn);
    //   console.log(pump.isOn);
    // });

    // button.on("release", () => {
    //   console.log("release");
    //   led.off();
    //   pump.off();
    //   console.log(led.isOn);
    //   console.log(pump.isOn);
    // });
  }
}
