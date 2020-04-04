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

export type NotificationState = {
  notifications: Notification[];
};

export type Notification = {
  [identifier: string]: any;
  deviceId: string;
  id: string;
  title: string;
  body: string;
  deleted?: boolean;
  _ts: number;
};

export type DataState = {
  sensorData: SensorData[];
  notifications: Notification[];
  dataLoading: boolean;
};
