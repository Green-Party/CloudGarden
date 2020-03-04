/**
 * Creation Date: February 26, 2020
 * Author: Luke Slevinsky
 * Types for the app
 */

export type SensorState = {
  sensorData: SensorData[];
};

export type SensorData = {
  [identifier: string]: any;
  id: string;
  visible: number;
  ir: number;
  uv_index: number;
  water_level: number;
  temp: number[];
  soil_humidity: number[];
  pumps_enabled: boolean;
  _ts: Date;
};
