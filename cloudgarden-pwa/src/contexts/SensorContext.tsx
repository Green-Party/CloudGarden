/**
 * Creation Date: February 25, 2020
 * Author: Luke Slevinsky
 * This is a React context specifically to provide the web app with sensor data as state
 * Ideas modified from: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 *   and signalR code from: https://anthonychu.ca/post/cosmosdb-real-time-azure-functions-signalr-service/
 */
import React, { useState, useContext, createContext, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { SensorData, Notification, DataState } from "../types";

type SensorDataProviderProps = { children: React.ReactNode };
const SensorStateContext = createContext<DataState | undefined>(undefined);

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
  title: "TITLE",
  body: "BODY",
  deviceId: "0",
  _ts: 0
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

function SensorDataProvider({ children }: SensorDataProviderProps) {
  const [sensorData, updateSensorState]: [SensorData[], Function] = useState([
    defaultSensorData
  ]);
  const [notifications, updateNotificationState]: [
    Notification[],
    Function
  ] = useState([defaultNotification]);

  function sensorsUpdated(updatedSensor: SensorData) {
    updateSensorState((sensorData: SensorData[]) => {
      console.log(`Sensor UPDATED ${updatedSensor}`);
      console.log(updatedSensor);

      const stateCopy = Array.from(sensorData);
      let newState;
      let sensor = stateCopy.find((s: SensorData) => s.id === updatedSensor.id);
      if (sensor) {
        Object.assign(sensor, updatedSensor);
        newState = stateCopy;
      } else {
        newState = [...sensorData, updatedSensor];
      }

      if (newState[0] === defaultSensorData) {
        newState = Array.from(newState.slice(1));
      }
      return newState;
    });
  }

  function notificationsUpdated(updatedNotification: Notification) {
    updateNotificationState((notificationData: Notification[]) => {
      console.log(`Notification UPDATED ${updatedNotification}`);
      console.log(updatedNotification);

      const stateCopy = Array.from(notificationData);
      let newState;
      let notification = stateCopy.find(
        (n: Notification) => n.id === updatedNotification.id
      );
      if (notification) {
        Object.assign(notification, updatedNotification);
        newState = stateCopy;
      } else {
        newState = [...notificationData, updatedNotification];
      }
      if (newState[0] === defaultNotification) {
        newState = Array.from(newState.slice(1));
      }
      return newState;
    });
  }

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

  const state: DataState = {
    sensorData: sensorData,
    notifications: notifications
  };

  return (
    <SensorStateContext.Provider value={state}>
      {children}
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

export { SensorDataProvider, useSensorDataState };
