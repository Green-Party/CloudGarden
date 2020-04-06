import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  dataStateReducer,
  defaultDataState,
  Action
} from "../contexts/SensorContext";
import { SensorData, Notification, DataState } from "../types";
import {
  mockSensorData,
  mockNotification,
  mockDataState,
  defaultNotification,
  defaultSensorData
} from "./utils";

configure({ adapter: new Adapter() });

describe("dataStateReducer", () => {
  test("handles ADD_SENSOR_DATA when sensor is new", async () => {
    const action: Action = {
      type: "ADD_SENSOR_DATA",
      payload: { updatedSensor: mockSensorData() }
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual({
      sensorData: [action.payload.updatedSensor],
      notifications: defaultDataState.notifications,
      dataLoading: true
    });
  });
  test("handles ADD_SENSOR_DATA when sensor exists already", async () => {
    const sensorToUpdate = mockSensorData();
    const existingSensor = mockSensorData();
    existingSensor.id = sensorToUpdate.id;
    const existingState = {
      sensorData: [existingSensor],
      notifications: defaultDataState.notifications,
      dataLoading: true
    };
    const action: Action = {
      type: "ADD_SENSOR_DATA",
      payload: { updatedSensor: sensorToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual({
      sensorData: [action.payload.updatedSensor],
      notifications: defaultDataState.notifications,
      dataLoading: true
    });
  });
  test("handles REMOVE_SENSOR_DATA when sensor exists", async () => {
    const sensorToUpdate = mockSensorData();
    const existingState = {
      sensorData: [...defaultDataState.sensorData, sensorToUpdate],
      notifications: defaultDataState.notifications,
      dataLoading: true
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
      notifications: [action.payload.updatedNotification],
      dataLoading: true
    });
  });
  test("handles ADD_NOTIFICATION_DATA when notification exists already", async () => {
    const notificationToUpdate = mockNotification();
    const existingNotification = mockNotification();
    existingNotification.id = notificationToUpdate.id;
    const existingState = {
      sensorData: defaultDataState.sensorData,
      notifications: [...defaultDataState.notifications, existingNotification],
      dataLoading: true
    };
    const action: Action = {
      type: "ADD_NOTIFICATION_DATA",
      payload: { updatedNotification: notificationToUpdate }
    };
    expect(dataStateReducer(existingState, action)).toEqual({
      sensorData: defaultDataState.sensorData,
      notifications: [notificationToUpdate],
      dataLoading: true
    });
  });
  test("handles REMOVE_NOTIFICATION_DATA when notification exists", async () => {
    const notificationToUpdate = mockNotification();
    const existingState = {
      sensorData: defaultDataState.sensorData,
      notifications: [...defaultDataState.notifications, notificationToUpdate],
      dataLoading: true
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
  test("handles UPDATE_LOADING_STATE action", async () => {
    const action: Action = {
      type: "UPDATE_LOADING_STATE",
      payload: false
    };
    expect(dataStateReducer(defaultDataState, action)).toEqual({
      sensorData: defaultDataState.sensorData,
      notifications: defaultDataState.notifications,
      dataLoading: false
    });
  });
});
