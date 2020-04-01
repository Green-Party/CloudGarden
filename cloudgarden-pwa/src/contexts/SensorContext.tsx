/**
 * Creation Date: February 25, 2020
 * Author: Luke Slevinsky
 * This is a React context specifically to provide the web app with sensor data as state
 * Ideas modified from: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 *   and signalR code from: https://anthonychu.ca/post/cosmosdb-real-time-azure-functions-signalr-service/
 */
import React, { useContext, createContext, useEffect, useReducer } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { SensorData, Notification, DataState } from "../types";
// Action types
const ADD_SENSOR_DATA = "ADD_SENSOR_DATA";
const REMOVE_SENSOR_DATA = "REMOVE_SENSOR_DATA";
const ADD_NOTIFICATION_DATA = "ADD_NOTIFICATION_DATA";
const REMOVE_NOTIFICATION_DATA = "REMOVE_NOTIFICATION_DATA";

type SensorDataProviderProps = { children: React.ReactNode };
type NotificationPayload = {
  updatedNotification: Notification;
};
type SensorDataPayload = {
  updatedSensor: SensorData;
};
type SensorType = "ADD_SENSOR_DATA" | "REMOVE_SENSOR_DATA";
type NotificationType = "ADD_NOTIFICATION_DATA" | "REMOVE_NOTIFICATION_DATA";
type Action =
  | { type: SensorType; payload: SensorDataPayload }
  | { type: NotificationType; payload: NotificationPayload };
type Dispatch = (action: Action) => void;

const SensorStateContext = createContext<DataState | undefined>(undefined);
const SensorStateDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

const defaultSensorData: SensorData = {
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

const defaultNotification: Notification = {
  id: "0",
  title: "EMPTY",
  body: "NO NOTIFICATIONS",
  deviceId: "0",
  _ts: 0
};

export const defaultDataState: DataState = {
  sensorData: [defaultSensorData],
  notifications: [defaultNotification]
};

// axios configs
const apiBaseUrl = "https://db-to-signalr-service.azurewebsites.net/";
const axiosConfig = {};

function getConnectionInfo() {
  return axios
    .post(`${apiBaseUrl}/api/negotiate`, null, axiosConfig)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return {};
    });
}

function getSensorData() {
  return axios
    .get(`${apiBaseUrl}/api/GetSensorData`, axiosConfig)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return {};
    });
}

function getNotifications() {
  return axios
    .get(`${apiBaseUrl}/api/GetNotifications`, axiosConfig)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return {};
    });
}

function startConnection(connection: signalR.HubConnection) {
  console.log("connecting...");
  connection
    .start()
    .then(() => {
      console.log("connected!");
    })
    .catch(err => {
      console.error(err);
      setTimeout(() => {
        startConnection(connection);
      }, 2000);
    });
}

export function dataStateReducer(state: DataState, action: Action) {
  switch (action.type) {
    case ADD_SENSOR_DATA: {
      const stateCopy: SensorData[] = Array.from(state.sensorData);
      const updatedSensor: SensorData = action.payload.updatedSensor;
      let newState;
      let sensor = stateCopy.find((s: SensorData) => s.id === updatedSensor.id);
      if (sensor) {
        Object.assign(sensor, updatedSensor);
        newState = stateCopy;
      } else {
        newState = [...stateCopy, updatedSensor];
      }
      if (newState[0] === defaultSensorData) {
        newState = Array.from(newState.slice(1));
      }
      return {
        sensorData: newState,
        notifications: state.notifications
      };
    }
    case REMOVE_SENSOR_DATA: {
      const stateCopy: SensorData[] = Array.from(state.sensorData);
      const updatedSensor: SensorData = action.payload.updatedSensor;
      const index = stateCopy.indexOf(updatedSensor);
      if (index > -1) {
        stateCopy.splice(index, 1);
      } else {
        console.log("No sensor to delete");
      }
      return {
        sensorData: stateCopy,
        notifications: state.notifications
      };
    }
    case ADD_NOTIFICATION_DATA: {
      const stateCopy = Array.from(state.notifications);
      const updatedNotification: Notification =
        action.payload.updatedNotification;
      let newState;
      let notification = stateCopy.find(
        (n: Notification) => n.id === updatedNotification.id
      );
      if (notification) {
        if (notification.deleted) {
          const index = stateCopy.indexOf(notification);
          if (index > -1) {
            stateCopy.splice(index, 1);
          }
        } else {
          Object.assign(notification, updatedNotification);
        }
        newState = stateCopy;
      } else {
        newState = [...stateCopy, updatedNotification];
      }
      if (newState[0] === defaultNotification) {
        newState = Array.from(newState.slice(1));
      }
      return {
        notifications: newState,
        sensorData: state.sensorData
      };
    }
    case REMOVE_NOTIFICATION_DATA: {
      const stateCopy: Notification[] = Array.from(state.notifications);
      const updatedNotification: Notification =
        action.payload.updatedNotification;
      const index = stateCopy.indexOf(updatedNotification);
      if (index > -1) {
        stateCopy.splice(index, 1);
      } else {
        console.log("No notification to delete");
      }
      return {
        notifications: stateCopy,
        sensorData: state.sensorData
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function SensorDataProvider({ children }: SensorDataProviderProps) {
  const [state, dispatch] = useReducer(dataStateReducer, defaultDataState);

  const sensorsUpdated = (updatedSensor: SensorData) => {
    dispatch({ type: ADD_SENSOR_DATA, payload: { updatedSensor } });
  };
  const notificationsUpdated = (updatedNotification: Notification) => {
    dispatch({ type: ADD_NOTIFICATION_DATA, payload: { updatedNotification } });
  };

  useEffect(() => {
    getSensorData()
      .then(sensors => sensors.forEach(sensorsUpdated))
      .then(getNotifications)
      .then(notificationData => notificationData.forEach(notificationsUpdated))
      .then(getConnectionInfo)
      .then(info => {
        let accessToken = info.accessToken;
        const options = {
          accessTokenFactory: () => {
            if (accessToken) {
              const _accessToken = accessToken;
              accessToken = null;
              return _accessToken;
            } else {
              return getConnectionInfo().then(info => {
                return info.accessToken;
              });
            }
          }
        };
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(info.url, options)
          .configureLogging(signalR.LogLevel.Information)
          .build();

        connection.on("sensorsUpdated", sensorsUpdated);
        connection.on("notificationsUpdated", notificationsUpdated);

        connection.onclose(() => {
          console.log("disconnected");
          setTimeout(() => {
            startConnection(connection);
          }, 2000);
        });
        startConnection(connection);
      })
      .catch(console.error);
  }, []);
  return (
    <SensorStateContext.Provider value={state}>
      <SensorStateDispatchContext.Provider value={dispatch}>
        {children}
      </SensorStateDispatchContext.Provider>
    </SensorStateContext.Provider>
  );
}

function useSensorDataState() {
  const context = useContext(SensorStateContext);
  if (context === undefined) {
    throw new Error(
      "useSensorDataState must be used within a SensorDataProvider"
    );
  }
  return context;
}

function useSensorDataDispatch() {
  const context = React.useContext(SensorStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSensorDataDispatch must be used within a SensorDataProvider"
    );
  }
  return context;
}

function useSensorData(): [DataState, Dispatch] {
  return [useSensorDataState(), useSensorDataDispatch()];
}

export {
  SensorDataProvider,
  useSensorDataState,
  useSensorDataDispatch,
  useSensorData,
  ADD_SENSOR_DATA,
  REMOVE_SENSOR_DATA,
  ADD_NOTIFICATION_DATA,
  REMOVE_NOTIFICATION_DATA
};
