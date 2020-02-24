/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * Renders the direct app routes and side navigation
 */
import React, { lazy, Suspense, useState, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import "./Header.css";
import "./Dashboard.css";
import Header from "./components/main/Header";
import ControlView from "./components/controls/ControlView";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./styles/Theme";
import NavDrawer from "./components/main/NavDrawer";
import TestDashboard from "./components/TestDashboard";

const Home = lazy(() => import("./Home"));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>
        <Header onMenuClick={setOpen} />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/dashboard">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/controls">
                <ControlView />
              </Route>
              <Route path="/notifications">
                <TestDashboard />
              </Route>
            </Switch>
          </Suspense>
          <NavDrawer open={open} onCloseFunc={setOpen} />
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
