/**
 * Creation Date: January 26, 2020
 * Author: create-react-app
 * Auto generated component that renders the entire application
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { subscribeUser } from "./subscription";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./AppWithRouterAccess";

ReactDOM.render(
  <Router>
    <AppWithRouterAccess />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

subscribeUser();
