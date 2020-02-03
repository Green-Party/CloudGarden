/**
 * Creation Date: February 3, 2020
 * Author: Logan McDonald
 * Ported library for reading from SI1145 over I2C interface
 * Adapted from https://github.com/AgilatechSystems/si1145/blob/master/si1145.js
 */

const utils = require("./utils");

module.exports = class Si1145 {
  constructor(options) {
    let opts = options || {};

    this.device = {};
    this.device.name = opts.hasOwnProperty("name") ? opts.name : "Si1145";
    this.device.type = opts.hasOwnProperty("type") ? opts.type : "sensor";
    this.device.active = false;
    this.device.bus = opts.hasOwnProperty("bus") ? opts.bus : 1;
    this.device.addr = opts.hasOwnProperty("addr") ? opts.addr : 0x60;
    this.device.version = require("./package.json").version;
    this.device.parameters = [
      { name: "visible", type: "integer", value: NaN },
      { name: "ir", type: "integer", value: NaN },
      { name: "uv", type: "integer", value: NaN }
    ];

    // this.board = i2c.openSync(this.device.bus);
    this.board = opts.board;
    this.board.i2cConfig();

    this.initialize();
  }

  initialize() {
    this.loadConstants();

    this.reset();

    this.setCalibration();

    // enable UV, IR, and Visible
    this.writeParam(
      this.param.CHLIST,
      this.param.CHLIST_ENUV |
        this.param.CHLIST_ENALSIR |
        this.param.CHLIST_ENALSVIS
    );

    // enable interrupt on every sample
    this.board.i2cWriteReg(
      this.device.addr,
      this.register.INTCFG,
      this.register.INTCFG_INTOE
    );
    this.board.i2cWriteReg(
      this.device.addr,
      this.register.IRQEN,
      this.register.IRQEN_ALSEVERYSAMPLE
    );

    this.writeParam(this.param.ALSIRADCMUX, this.param.ADCMUX_SMALLIR);
    // fastest clocks, clock div 1
    this.writeParam(this.param.ALSIRADCGAIN, 0);
    // take 511 clocks to measure
    this.writeParam(this.param.ALSIRADCOUNTER, this.param.ADCCOUNTER_511CLK);
    // in high range mode
    this.writeParam(this.param.ALSIRADCMISC, this.param.ALSIRADCMISC_RANGE);

    // fastest clocks, clock div 1
    this.writeParam(this.param.ALSVISADCGAIN, 0);
    // take 511 clocks to measure
    this.writeParam(this.param.ALSVISADCOUNTER, this.param.ADCCOUNTER_511CLK);
    // in high range mode (not normal signal)
    this.writeParam(
      this.param.ALSVISADCMISC,
      this.param.ALSVISADCMISC_VISRANGE
    );

    // measurement rate for auto
    this.board.i2cWriteReg(this.device.addr, this.register.MEASRATE0, 0xff); // 255 * 31.25uS = 8ms

    // auto run
    this.board.i2cWriteReg(
      this.device.addr,
      this.register.COMMAND,
      this.command.PSALS_AUTO
    );

    this.device.active = true;
  }

  deviceName() {
    return this.device.name;
  }

  deviceType() {
    return this.device.type;
  }

  deviceVersion() {
    return this.device.version;
  }

  deviceNumValues() {
    return this.device.parameters.length;
  }

  typeAtIndex(idx) {
    if (!this.isIdxInRange(idx)) {
      this.logError(`Si1145 Error: typeAtIndex(${idx}) index out of range`);
      return null;
    }
    return this.device.parameters[idx].type;
  }

  nameAtIndex(idx) {
    if (!this.isIdxInRange(idx)) {
      this.logError(`Si1145 Error: nameAtIndex(${idx}) index out of range`);
      return null;
    }
    return this.device.parameters[idx].name;
  }

  deviceActive() {
    return this.device.active;
  }

  valueAtIndex(idx, callback) {
    if (!this.isIdxInRange(idx)) {
      callback(`Si1145 Error: index ${idx} out of range`, null);
    } else {
      const readReg = this.getReadRegisterAtIndex(idx);
      this.board.readI2cBlock(
        this.device.addr,
        readReg,
        2,
        Buffer.alloc(2),
        (err, bytesRead, buffer) => {
          if (err) {
            callback(err);
          } else {
            this.device.parameters[idx].value = Si1145.uint16(
              buffer[1],
              buffer[0]
            );
            // special case for UV -- needs to be divided by 100
            if (idx == 2) {
              this.device.parameters[idx].value = Math.round(
                this.device.parameters[idx].value / 100
              );
            }
            callback(null, this.device.parameters[idx].value);
          }
        }
      );
    }
  }

  valueAtIndexSync(idx) {
    if (!this.isIdxInRange(idx)) {
      this.logError(
        `Si1145 Error: readValueAtIndexSync(${idx}) index out of range`
      );
      return NaN;
    }

    const readReg = this.getReadRegisterAtIndex(idx);

    var buffer = Buffer.alloc(2);
    this.board.readI2cBlockSync(this.device.addr, readReg, 2, buffer);

    this.device.parameters[idx].value = Si1145.uint16(buffer[1], buffer[0]);

    // special case for UV -- needs to be divided by 100
    if (idx == 2) {
      this.device.parameters[idx].value = Math.round(
        this.device.parameters[idx].value / 100
      );
    }

    return this.device.parameters[idx].value;
  }

  getReadRegisterAtIndex(idx) {
    var readReg = this.register.ALSVISDATA0;
    if (idx == 1) {
      readReg = this.register.ALSIRDATA0;
    } else if (idx == 2) {
      readReg = this.register.UVINDEX0;
    }

    return readReg;
  }

  getDataFromDevice(callback) {
    if (!this.device.active) {
      callback("Device not active");
      return;
    }

    this.valueAtIndex(0, (err, vis) => {
      if (err) {
        callback(err);
      } else {
        this.valueAtIndex(1, (err, ir) => {
          if (err) {
            callback(err);
          } else {
            this.valueAtIndex(2, (err, uv) => {
              if (err) {
                callback(err);
              } else {
                callback();
              }
            });
          }
        });
      }
    });
  }

  getDataFromDeviceSync() {
    if (!this.device.active) {
      this.logError("Device not active");
      return false;
    }

    this.device.parameters[0].value = this.valueAtIndexSync(0);
    this.device.parameters[1].value = this.valueAtIndexSync(1);
    this.device.parameters[2].value = this.valueAtIndexSync(2);
    return true;
  }

  logError(err) {
    console.error(`${this.device.name} ERROR: ${err}`);
  }

  isIdxInRange(idx) {
    if (idx < 0 || idx >= this.device.parameters.length) {
      return false;
    }
    return true;
  }

  async writeParam(p, v) {
    this.board.i2cWriteReg(this.device.addr, this.register.COMMAND, 0x00);
    this.board.i2cReadOnce(
      this.device.addr,
      this.register.RESPONSE,
      8,
      async bytes => {
        while (bytes[0] == 0x00) {
          this.board.i2cWriteReg(this.device.addr, this.register.PARAMWR, v);
          this.board.i2cWriteReg(
            this.device.addr,
            this.register.COMMAND,
            p | this.command.PARAM_SET
          );
          await utils.sleep(2);
          this.board.i2cReadOnce(
            this.device.addr,
            this.register.RESPONSE,
            8,
            response => {
              bytes = response;
            }
          );
        }
      }
    );
  }

  async reset() {
    this.board.i2cWriteReg(this.device.addr, this.register.MEASRATE0, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.MEASRATE1, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.IRQEN, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.IRQMODE1, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.IRQMODE2, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.INTCFG, 0);
    this.board.i2cWriteReg(this.device.addr, this.register.IRQSTAT, 0xff);

    this.board.i2cWriteReg(
      this.device.addr,
      this.register.COMMAND,
      this.command.RESET
    );
    await utils.sleep(10);
    this.board.i2cWriteReg(
      this.device.addr,
      this.register.HWKEY,
      this.register.PARAMWR
    );
    await utils.sleep(10);
  }

  setCalibration() {
    // Calibration is performed by setting the coefficients in UCOEF [0:3]
    // registers to the proper values.  The problem is that the proper values
    // are derived by measuring values when the hardware is held in absolute
    // darkness, and then subjecting the resuling values to a complex set of
    // calculations. However, if we wanted to collect scientifically accurate
    // light measurements, we would not use this crappy hardware sensor in the
    // first place, so estimating the coefficients is good enough.

    // The default values for UCOEF[0:3] are 0x7B, 0x6B, 0x01, and 0x00.

    // The coefficeint values provided by Adafruit are 0x29, 0x89, 0x02, and 0x00

    this.board.writeByteSync(this.device.addr, this.register.UCOEFF0, 0x29);
    this.board.writeByteSync(this.device.addr, this.register.UCOEFF1, 0x89);
    this.board.writeByteSync(this.device.addr, this.register.UCOEFF2, 0x02);
    this.board.writeByteSync(this.device.addr, this.register.UCOEFF3, 0x00);

    // // Split the difference and call it good!
    // this.board.writeByteSync(this.device.addr, this.register.UCOEFF0, 0x52);
    // this.board.writeByteSync(this.device.addr, this.register.UCOEFF1, 0x7a);
    // this.board.writeByteSync(this.device.addr, this.register.UCOEFF2, 0x02);
    // this.board.writeByteSync(this.device.addr, this.register.UCOEFF3, 0x00);
  }

  loadConstants() {
    this.command = {
      PARAM_QUERY: 0x80,
      PARAM_SET: 0xa0,
      NOP: 0x0,
      RESET: 0x01,
      BUSADDR: 0x02,
      PS_FORCE: 0x05,
      ALS_FORCE: 0x06,
      PSALS_FORCE: 0x07,
      PS_PAUSE: 0x09,
      ALS_PAUSE: 0x0a,
      PSALS_PAUSE: 0xb,
      PS_AUTO: 0x0d,
      ALS_AUTO: 0x0e,
      PSALS_AUTO: 0x0f,
      GET_CAL: 0x12
    };

    this.param = {
      I2CADDR: 0x00,
      CHLIST: 0x01,
      CHLIST_ENUV: 0x80,
      CHLIST_ENAUX: 0x40,
      CHLIST_ENALSIR: 0x20,
      CHLIST_ENALSVIS: 0x10,
      CHLIST_ENPS1: 0x01,
      CHLIST_ENPS2: 0x02,
      CHLIST_ENPS3: 0x04,
      PSLED3SEL: 0x03,
      PSENCODE: 0x05,
      ALSENCODE: 0x06,
      PS1ADCMUX: 0x07,
      PS2ADCMUX: 0x08,
      PS3ADCMUX: 0x09,
      PSADCOUNTER: 0x0a,
      PSADCGAIN: 0x0b,
      PSADCMISC: 0x0c,
      PSADCMISC_RANGE: 0x20,
      PSADCMISC_PSMODE: 0x04,
      ALSIRADCMUX: 0x0e,
      AUXADCMUX: 0x0f,
      ALSVISADCOUNTER: 0x10,
      ALSVISADCGAIN: 0x11,
      ALSVISADCMISC: 0x12,
      ALSVISADCMISC_VISRANGE: 0x20,
      ALSIRADCOUNTER: 0x1d,
      ALSIRADCGAIN: 0x1e,
      ALSIRADCMISC: 0x1f,
      ALSIRADCMISC_RANGE: 0x20,
      ADCCOUNTER_511CLK: 0x70,
      ADCMUX_SMALLIR: 0x00,
      ADCMUX_LARGEIR: 0x03
    };

    this.register = {
      PARTID: 0x00,
      REVID: 0x01,
      SEQID: 0x02,
      INTCFG: 0x03,
      INTCFG_INTOE: 0x01,
      INTCFG_INTMODE: 0x02,
      IRQEN: 0x04,
      IRQEN_ALSEVERYSAMPLE: 0x01,
      IRQEN_PS1EVERYSAMPLE: 0x04,
      IRQEN_PS2EVERYSAMPLE: 0x08,
      IRQEN_PS3EVERYSAMPLE: 0x10,
      IRQMODE1: 0x05,
      IRQMODE2: 0x06,
      HWKEY: 0x07,
      MEASRATE0: 0x08,
      MEASRATE1: 0x09,
      PSRATE: 0x0a,
      PSLED21: 0x0f,
      PSLED3: 0x10,
      UCOEFF0: 0x13,
      UCOEFF1: 0x14,
      UCOEFF2: 0x15,
      UCOEFF3: 0x16,
      PARAMWR: 0x17,
      COMMAND: 0x18,
      RESPONSE: 0x20,
      IRQSTAT: 0x21,
      IRQSTAT_ALS: 0x01,
      ALSVISDATA0: 0x22,
      ALSVISDATA1: 0x23,
      ALSIRDATA0: 0x24,
      ALSIRDATA1: 0x25,
      PS1DATA0: 0x26,
      PS1DATA1: 0x27,
      PS2DATA0: 0x28,
      PS2DATA1: 0x29,
      PS3DATA0: 0x2a,
      PS3DATA1: 0x2b,
      UVINDEX0: 0x2c,
      UVINDEX1: 0x2d,
      PARAMRD: 0x2e,
      CHIPSTAT: 0x30
    };
  }

  static uint16(msb, lsb) {
    return (msb << 8) | lsb;
  }
};
