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
import { SensorData } from "../types";

type SensorDataProviderProps = { children: React.ReactNode };
const SensorStateContext = createContext<SensorData[] | undefined>(undefined);

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
  const [sensorData, updateSensorState]: [SensorData[], Function] = useState(
    []
  );

  function sensorsUpdated(updatedSensor: SensorData) {
    updateSensorState((sensorData: SensorData[]) => {
      console.log(`Sensor UPDATED ${updatedSensor}`);
      console.log(updatedSensor);
      let stateCopy = Array.from(sensorData);
      let newState;
      let sensor = stateCopy.find((s: SensorData) => s.id === updatedSensor.id);
      if (sensor) {
        Object.assign(sensor, updatedSensor);
        newState = stateCopy;
      } else {
        newState = [...sensorData, updatedSensor];
      }
      return newState;
    });
  }

  useEffect(() => {
    getSensorData()
      .then(sensors => sensors.forEach(sensorsUpdated))
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
    <SensorStateContext.Provider value={sensorData}>
      {children}
    </SensorStateContext.Provider>
  );
}

function useSensorState() {
  const context = useContext(SensorStateContext);
  if (context === undefined) {
    throw new Error("useSensorState must be used within a SensorDataProvider");
  }
  return context;
}

export { SensorDataProvider, useSensorState };
