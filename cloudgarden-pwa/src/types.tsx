/**
 * Creation Date: February 26, 2020
 * Author: Luke Slevinsky
 * Types for the app
 */

export type SensorState = {
  sensorData: SensorData[];
};

export type SensorData = {
  _rid: string;
  visible: number;
  ir: number;
  uvIdx: number;
  waterLevel: number;
  temp: number[];
  soilHumidity: number[];
  pumpsEnabled: boolean;
  _ts: Date;
};
