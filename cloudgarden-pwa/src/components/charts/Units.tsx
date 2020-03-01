/**
 * Creation Date: February 28, 2020
 * Author: Gillian Pierce
 * Unit types for TypeScript
 */
export enum SensorType {
  TEMP = "TEMP",
  MOISTURE = "MOISTURE",
  UVINDEX = "UVINDEX",
  IR = "IR",
  VISIBLE = "VISIBLE",
  WATER = "WATER"
}

export enum SensorUnit {
  CELSIUS = "CELSIUS",
  FERINHEIGHT = "FERINHEIGHT",
  UNITS = "UNITS"
}

interface SensorRangesType {
  [identifier: string]: any;
}

export const SensorRanges: SensorRangesType = {
  TEMP: {
    CELSIUS: {
      low: 0,
      high: 100,
      ideal: 50
    },
    FERINHEIGHT: {
      low: 32,
      high: 212,
      ideal: 122
    }
  },
  MOISTURE: {
    low: 1,
    high: 10,
    ideal: 6.5
  },
  UVINDEX: {
    low: 0,
    high: 11,
    ideal: 4
  },
  IR: {
    low: 550,
    high: 1000,
    ideal: 800
  },
  VISIBLE: {
    low: 400,
    high: 800,
    ideal: 530
  },
  WATER: {
    low: 0,
    high: 4400,
    ideal: 4400
  }
};
