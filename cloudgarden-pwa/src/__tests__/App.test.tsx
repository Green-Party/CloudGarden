import React from "react";
import { shallow, configure, mount } from "enzyme";
import { Router, Route } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import * as SDC from "../contexts/SensorContext";
import * as Auth from "../contexts";
import Loading from "../components/Loading";
import Home from "../Home";
import Header from "../components/main/Header";

configure({ adapter: new Adapter() });

const MOCK_USE_AUTH_TRUE = {
  isAuthenticated: false,
  loading: true,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {},
  logout: () => {}
};

const MOCK_USE_AUTH_FALSE = {
  isAuthenticated: false,
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {},
  logout: () => {}
};

describe("<App/>", () => {
  test("renders loading component when dataLoading", async () => {
    jest.spyOn(SDC, "useSensorDataState").mockReturnValue(SDC.defaultDataState);
    jest.spyOn(Auth, "useAuth0").mockImplementation(() => MOCK_USE_AUTH_FALSE);
    const wrapper = mount(
      <SDC.SensorDataProvider>
        <App />
      </SDC.SensorDataProvider>
    );
    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(Router)).not.toHaveLength(1);
  });
  test("renders loading component when loading", async () => {
    const falseLoading = SDC.defaultDataState;
    falseLoading.dataLoading = false;
    jest.spyOn(SDC, "useSensorDataState").mockReturnValue(falseLoading);
    jest.spyOn(Auth, "useAuth0").mockImplementation(() => MOCK_USE_AUTH_TRUE);
    const wrapper = mount(
      <SDC.SensorDataProvider>
        <App />
      </SDC.SensorDataProvider>
    );
    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(Router)).not.toHaveLength(1);
  });
  test("No loading when loading and dataLoading both false", async () => {
    const falseLoading = SDC.defaultDataState;
    falseLoading.dataLoading = false;
    jest.spyOn(SDC, "useSensorDataState").mockReturnValue(falseLoading);
    jest.spyOn(Auth, "useAuth0").mockImplementation(() => MOCK_USE_AUTH_FALSE);
    const wrapper = mount(
      <SDC.SensorDataProvider>
        <App />
      </SDC.SensorDataProvider>
    );
    expect(wrapper.find(Router)).toHaveLength(1);
  });
  test("Only renders default home component when not authenticated", async () => {
    const falseLoading = SDC.defaultDataState;
    falseLoading.dataLoading = false;
    jest.spyOn(SDC, "useSensorDataState").mockReturnValue(falseLoading);
    jest.spyOn(Auth, "useAuth0").mockImplementation(() => MOCK_USE_AUTH_FALSE);
    const wrapper = mount(
      <SDC.SensorDataProvider>
        <App />
      </SDC.SensorDataProvider>
    );
    expect(wrapper.find(Header).find('button[id="login-button"]')).toHaveLength(
      1
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  });
});
