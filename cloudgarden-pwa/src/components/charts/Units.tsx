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
      ideal: 21
    },
    FERINHEIGHT: {
      low: 32,
      high: 212,
      ideal: 70
    }
  },
  SOIL_MOISTURE: {
    low: 0,
    high: 10,
    ideal: 4
  },
  UV_INDEX: {
    low: 0,
    high: 10,
    ideal: 2
  },
  IR: {
    low: 0,
    high: 800,
    ideal: 300
  },
  VISIBLE: {
    low: 0,
    high: 700,
    ideal: 300
  },
  WATER_LEVEL: {
    low: 0,
    high: 4400,
    ideal: 4400
  }
};
