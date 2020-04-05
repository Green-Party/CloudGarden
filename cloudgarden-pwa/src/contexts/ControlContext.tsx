/**
 * Creation Date: March 31, 2020
 * Author: Luke Slevinsky
 * This is a React context specifically to provide state to the controlling dashboards
 * Ideas modified from: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
import React, { useContext, createContext, useReducer } from "react";
import { LightAutomationPayload, MoistureAutomationPayload } from "../types";

// Action types
const UPDATE_CONTROL_DASHBOARD = "UPDATE_CONTROL_DASHBOARD";
const UPDATE_LIGHT_AUTOMATION = "UPDATE_LIGHT_AUTOMATION";
const UPDATE_MOISTURE_AUTOMATION = "UPDATE_MOISTURE_AUTOMATION";

type ControlStateProviderProps = { children: React.ReactNode };
type ControlState = {
  controlDashboard: ControlDashboardPayload;
  automationDashboard: AutomationDashboardPayload;
};
type ControlDashboardPayload = {
  lightState: boolean;
};
type AutomationDashboardPayload = {
  moisture: MoistureAutomationPayload;
  light: LightAutomationPayload;
};
type ControlDashboardType = "UPDATE_CONTROL_DASHBOARD";
type LightAutomationType = "UPDATE_LIGHT_AUTOMATION";
type MoistureAutomationType = "UPDATE_MOISTURE_AUTOMATION";
type Action =
  | { type: ControlDashboardType; payload: ControlDashboardPayload }
  | { type: LightAutomationType; payload: LightAutomationPayload }
  | { type: MoistureAutomationType; payload: MoistureAutomationPayload };
type Dispatch = (action: Action) => void;

const DEFAULT_CONTROL_STATE: ControlState = {
  controlDashboard: {
    lightState: false,
  },
  automationDashboard: {
    moisture: {
      moistureAutomation: false,
      selectedNumber: "",
    },
    light: {
      lightAutomation: false,
      selectedStartTime: null,
      selectedEndTime: null,
    },
  },
};

const ControlStateContext = createContext<ControlState | undefined>(undefined);
const ControlStateDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

function controlStateReducer(state: ControlState, action: Action) {
  switch (action.type) {
    case UPDATE_CONTROL_DASHBOARD: {
      return {
        controlDashboard: action.payload,
        automationDashboard: state.automationDashboard,
      };
    }
    case UPDATE_LIGHT_AUTOMATION: {
      return {
        controlDashboard: state.controlDashboard,
        automationDashboard: {
          moisture: state.automationDashboard.moisture,
          light: action.payload,
        },
      };
    }
    case UPDATE_MOISTURE_AUTOMATION: {
      return {
        controlDashboard: state.controlDashboard,
        automationDashboard: {
          moisture: action.payload,
          light: state.automationDashboard.light,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function ControlStateProvider({ children }: ControlStateProviderProps) {
  const [state, dispatch] = useReducer(
    controlStateReducer,
    DEFAULT_CONTROL_STATE
  );

  return (
    <ControlStateContext.Provider value={state}>
      <ControlStateDispatchContext.Provider value={dispatch}>
        {children}
      </ControlStateDispatchContext.Provider>
    </ControlStateContext.Provider>
  );
}

function useControlDataState() {
  const context = useContext(ControlStateContext);
  if (context === undefined) {
    throw new Error(
      "useControlDataState must be used within a ControlDataProvider"
    );
  }
  return context;
}

function useControlDataDispatch() {
  const context = React.useContext(ControlStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSensorDataDispatch must be used within a SensorDataProvider"
    );
  }
  return context;
}

function useControlState(): [ControlState, Dispatch] {
  return [useControlDataState(), useControlDataDispatch()];
}

export {
  ControlStateProvider,
  useControlDataState,
  useControlDataDispatch,
  useControlState,
  UPDATE_CONTROL_DASHBOARD,
  UPDATE_LIGHT_AUTOMATION,
  UPDATE_MOISTURE_AUTOMATION,
};
