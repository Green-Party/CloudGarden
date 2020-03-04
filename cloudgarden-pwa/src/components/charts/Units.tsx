/**
 * Creation Date: February 28, 2020
 * Author: Gillian Pierce
 * Unit types for TypeScript
 */
export enum SensorType {
  TEMPERATURE = "TEMPERATURE",
  SOIL_MOISTURE = "SOIL_MOISTURE",
  UV_INDEX = "UV_INDEX",
  IR = "IR",
  VISIBLE = "VISIBLE",
  WATER_LEVEL = "WATER_LEVEL",
  PUMPS_ENABLED = "PUMPS_ENABLED"
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
  TEMPERATURE: {
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
  SOIL_MOISTURE: {
    low: 1,
    high: 10,
    ideal: 6.5
  },
  UV_INDEX: {
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
  WATER_LEVEL: {
    low: 0,
    high: 4400,
    ideal: 4400
  }
};
