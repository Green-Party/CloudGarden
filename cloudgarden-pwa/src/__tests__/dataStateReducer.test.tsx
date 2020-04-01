import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { dataStateReducer, defaultDataState } from "../contexts/SensorContext";
import { SensorData, Notification, DataState } from "../types";
import {
  mockSensorData,
  mockNotification,
  mockDataState,
  defaultNotification,
  defaultSensorData
} from "./utils";

type SensorType = "ADD_SENSOR_DATA" | "REMOVE_SENSOR_DATA";
type NotificationType = "ADD_NOTIFICATION_DATA" | "REMOVE_NOTIFICATION_DATA";
type NotificationPayload = {
  updatedNotification: Notification;
};
type SensorDataPayload = {
  updatedSensor: SensorData;
};
type Action =
  | { type: SensorType; payload: SensorDataPayload }
  | { type: NotificationType; payload: NotificationPayload };
configure({ adapter: new Adapter() });

describe("dataStateReducer", () => {
  test("handles ADD_SENSOR_DATA when sensor is new", async () => {
    const action: Action = {
      type: "ADD_SENSOR_DATA",
      payload: { updatedSensor: mockSensorData() }
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual({
      sensorData: [action.payload.updatedSensor],
      notifications: defaultDataState.notifications
    });
  });
  test("handles ADD_SENSOR_DATA when sensor exists already", async () => {
    const sensorToUpdate = mockSensorData();
    const existingSensor = mockSensorData();
    existingSensor.id = sensorToUpdate.id;
    const existingState = {
      sensorData: [existingSensor],
      notifications: defaultDataState.notifications
    };
    const action: Action = {
      type: "ADD_SENSOR_DATA",
      payload: { updatedSensor: sensorToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual({
      sensorData: [action.payload.updatedSensor],
      notifications: defaultDataState.notifications
    });
  });
  test("handles REMOVE_SENSOR_DATA when sensor exists", async () => {
    const sensorToUpdate = mockSensorData();
    const existingState = {
      sensorData: [...defaultDataState.sensorData, sensorToUpdate],
      notifications: defaultDataState.notifications
    };
    const action: Action = {
      type: "REMOVE_SENSOR_DATA",
      payload: { updatedSensor: sensorToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual(defaultDataState);
  });
  test("handles REMOVE_SENSOR_DATA when sensor doesn't exist", async () => {
    const sensorToUpdate = mockSensorData();
    const action: Action = {
      type: "REMOVE_SENSOR_DATA",
      payload: { updatedSensor: sensorToUpdate }
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual(
      defaultDataState
    );
  });
  test("handles ADD_NOTIFICATION_DATA when notification is new", async () => {
    const action: Action = {
      type: "ADD_NOTIFICATION_DATA",
      payload: { updatedNotification: mockNotification() }
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual({
      sensorData: defaultDataState.sensorData,
      notifications: [action.payload.updatedNotification]
    });
  });
  test("handles ADD_NOTIFICATION_DATA when notification exists already", async () => {
    const notificationToUpdate = mockNotification();
    const existingNotification = mockNotification();
    existingNotification.id = notificationToUpdate.id;
    const existingState = {
      sensorData: defaultDataState.sensorData,
      notifications: [...defaultDataState.notifications, existingNotification]
    };
    const action: Action = {
      type: "ADD_NOTIFICATION_DATA",
      payload: { updatedNotification: notificationToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual({
      sensorData: defaultDataState.sensorData,
      notifications: [notificationToUpdate]
    });
  });
  test("handles REMOVE_NOTIFICATION_DATA when notification exists", async () => {
    const notificationToUpdate = mockNotification();
    const existingState = {
      sensorData: defaultDataState.sensorData,
      notifications: [...defaultDataState.notifications, notificationToUpdate]
    };
    const action: Action = {
      type: "REMOVE_NOTIFICATION_DATA",
      payload: { updatedNotification: notificationToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual(defaultDataState);
  });
  test("handles REMOVE_NOTIFICATION_DATA when notification doesn't exist", async () => {
    const notificationToUpdate = mockNotification();
    const action: Action = {
      type: "REMOVE_NOTIFICATION_DATA",
      payload: { updatedNotification: notificationToUpdate }
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual(
      defaultDataState
    );
  });
});
