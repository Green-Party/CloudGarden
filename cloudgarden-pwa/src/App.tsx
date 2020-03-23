/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * Renders the direct app routes and side navigation
 */
import React, { lazy, Suspense, useState, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./utils/history";
import { ThemeProvider } from "@material-ui/core/styles";
import { NotificationView } from "./components/notifications";
import { SensorDataProvider } from "./contexts";
import { UserAutomationView } from "./components/userInput";
import "./Header.css";
import "./Dashboard.css";
import Header from "./components/main/Header";
import ControlView from "./components/controls/ControlView";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./styles/Theme";
import NavDrawer from "./components/main/NavDrawer";
import NavBar from "./components/auth/NavBar";
import { useAuth0 } from "./contexts";

const Home = lazy(() => import("./Home"));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <SensorDataProvider>
          <Fragment>
            <Header onMenuClick={setOpen} />
            <Router history={history}>
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
                  <NotificationView />
                </Route>
                <Route path="/input">
                  <UserAutomationView />
                </Route>
              </Switch>
              <NavDrawer open={open} onCloseFunc={setOpen} />
            </Router>
          </Fragment>
        </SensorDataProvider>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
