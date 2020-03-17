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
import { NotificationView } from "./components/notifications";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./styles/Theme";
import NavDrawer from "./components/main/NavDrawer";
import { SensorDataProvider } from "./contexts";
import { Security, ImplicitCallback, withAuth } from "@okta/okta-react";
import { useAuth } from "./auth";

const Home = lazy(() => import("./Home"));

const App: React.FC = withAuth(({ auth }: any) => {
  const [open, setOpen] = useState(false);
  const [authenticated, user] = useAuth(auth);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <SensorDataProvider>
          <Fragment>
            <Header onMenuClick={setOpen} />
            <Router>
              <Security
                issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
                client_id={`${process.env.REACT_APP_OKTA_CLIENT_ID}/oauth2/default`}
                redirect_uri={`${window.location.origin}/implicit/callback`}
                pkce={true}
              >
                <Route path="/implicit/callback" component={ImplicitCallback} />
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
                </Switch>
                <NavDrawer open={open} onCloseFunc={setOpen} />
              </Security>
            </Router>
          </Fragment>
        </SensorDataProvider>
      </Suspense>
    </ThemeProvider>
  );
});

export default App;
