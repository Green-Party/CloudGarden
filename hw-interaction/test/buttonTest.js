const five = require("johnny-five");

module.exports = {
  buttonTest
};

let board = new five.Board();

function buttonTest(pressCallback, releaseCallback) {
  board.on("ready", () => {
    // NC.on() will send a high control signal
    // NO.on() will send a low control signal
    let pump = new five.Relay({
      pin: 3,
      type: "NC"
    });
    pump.off();

    let led = new five.Relay({
      pin: 4,
      type: "NC"
    });
    led.off();

    let button = new five.Button({
      pin: 7
    });

    // led.on() == led.close()
    button.on("press", pressCallback);

    button.on("release", releaseCallback);
  });
}
