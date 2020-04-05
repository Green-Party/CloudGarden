import { SensorData, Notification, DataState } from "../types";
import _ from "lodash";

export const defaultSensorData: SensorData = {
  id: "0",
  visible: 0,
  ir: 0,
  uv_index: 0,
  water_level: 0,
  temperature: [0, 0, 0],
  soil_moisture: [0, 0, 0],
  pumps_enabled: true,
  _ts: 0
};

export const defaultNotification: Notification = {
  id: "0",
  title: "EMPTY",
  body: "NO NOTIFICATIONS",
  deviceId: "0",
  _ts: 0
};

export const defaultDataState: DataState = {
  sensorData: [defaultSensorData],
  notifications: [defaultNotification],
  dataLoading: true
};

export function mockSensorData() {
  return {
    id: "id" + (Math.random() * 100).toString,
    visible: Math.random() * 100,
    ir: Math.random() * 100,
    uv_index: Math.random() * 100,
    water_level: Math.random() * 100,
    temperature: [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ],
    soil_moisture: [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ],
    pumps_enabled: true,
    _ts: Math.random() * 100
  };
}

export function mockNotification() {
  return {
    deviceId: "abshdbhdfkshd",
    id: "id" + (Math.random() * 100).toString,
    title: "title",
    body: "body",
    deleted: false,
    _ts: Math.random() * 100
  };
}

export function mockDataState(
  sensorLength: number,
  notificationLength: number
) {
  const sensorData = _.range(sensorLength).map(mockSensorData);
  const notifications = _.range(notificationLength).map(mockNotification);
  const dataLoading = true;
  return {
    sensorData,
    notifications,
    dataLoading
  };
}
