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
  temperature: number[];
  soil_moisture: number[];
  pumps_enabled: boolean;
  _ts: number;
};
