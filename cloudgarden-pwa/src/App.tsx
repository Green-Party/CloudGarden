/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * Renders the direct app routes and side navigation
 */
import React, { lazy, Suspense, useState, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { NotificationView } from "./components/notifications";
import { useSensorDataState } from "./contexts";
import { UserAutomationView } from "./components/userInput";
import { useAuth0, ControlStateProvider } from "./contexts";
import { PrivateRoute } from "./components/auth";
import "./Header.css";
import "./Dashboard.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./styles/Theme";
import Header from "./components/main/Header";
import ControlView from "./components/controls/ControlView";
import NavDrawer from "./components/main/NavDrawer";
import history from "./utils/history";
import Loading from "./components/Loading";

const Home = lazy(() => import("./Home"));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAuth0();
  const { dataLoading } = useSensorDataState();

  if (loading || dataLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Fragment>
          <Header onMenuClick={setOpen} />
          <ControlStateProvider>
            <Router history={history}>
              <Switch>
                <Route path="/dashboard">
                  <Home />
                </Route>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <PrivateRoute
                  path="/notifications"
                  component={NotificationView}
                />
                <PrivateRoute path="/controls" component={ControlView} />
                <PrivateRoute path="/input" component={UserAutomationView} />
              </Switch>
              <NavDrawer open={open} onCloseFunc={setOpen} />
            </Router>
          </ControlStateProvider>
        </Fragment>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
