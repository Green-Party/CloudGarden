/**
 * Creation Date: February 25, 2020
 * Author: Luke Slevinsky
 * Exporting all contexts in one place
 */
import {
  SensorDataProvider,
  useSensorDataState,
  useSensorDataDispatch,
  useSensorData,
  ADD_SENSOR_DATA,
  REMOVE_SENSOR_DATA,
  ADD_NOTIFICATION_DATA,
  REMOVE_NOTIFICATION_DATA,
} from "./SensorContext";
import { useAuth0, Auth0Provider } from "./ReactAuth0Spa";
import {
  ControlStateProvider,
  useControlState,
  useControlDataDispatch,
  useControlDataState,
  UPDATE_CONTROL_DASHBOARD,
  UPDATE_LIGHT_AUTOMATION,
  UPDATE_MOISTURE_AUTOMATION,
} from "./ControlContext";

export {
  SensorDataProvider,
  useSensorDataState,
  useSensorDataDispatch,
  useSensorData,
  ADD_SENSOR_DATA,
  REMOVE_SENSOR_DATA,
  ADD_NOTIFICATION_DATA,
  REMOVE_NOTIFICATION_DATA,
  useAuth0,
  Auth0Provider,
  ControlStateProvider,
  useControlState,
  useControlDataDispatch,
  useControlDataState,
  UPDATE_CONTROL_DASHBOARD,
  UPDATE_LIGHT_AUTOMATION,
  UPDATE_MOISTURE_AUTOMATION,
};
