/**
 * Creation Date: January 26, 2020
 * Author: create-react-app
 * Auto generated component that renders the entire application
 */

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.css";
import { subscribeUser } from "./subscription";
import { Auth0Provider, SensorDataProvider } from "./contexts";
import auth_config from "./components/auth/auth_config.json";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const config = auth_config as any;
const auth0Options = {
  domain: config.domain,
  client_id: config.clientId,
  redirect_uri: window.location.origin
};
ReactDOM.render(
  <Auth0Provider
    auth0Options={auth0Options}
    onRedirectCallback={onRedirectCallback}
  >
    <SensorDataProvider>
      <App />
    </SensorDataProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

subscribeUser();
