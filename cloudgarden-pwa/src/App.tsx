/** @jsx jsx */
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
  NavLink,
  Redirect
} from "react-router-dom";
import {
  Sheet,
  MenuList,
  MenuItem,
  IconBarChart2,
  IconSliders,
  IconBell,
  Badge
} from "sancho";
import { jsx } from "@emotion/core";
import "./Header.css";
import "./Dashboard.css";
import Header from "./components/Header";
const Home = lazy(() => import("./Home"));
const Controls = lazy(() =>
  import("./components/control/TestControlDashboard")
);

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Header onMenuClick={setOpen} />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/dashboard">
              <Home />
            </Route>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/controls" exact>
              <Controls />
            </Route>
          </Switch>
        </Suspense>

        <Sheet
          onRequestClose={() => setOpen(false)}
          isOpen={open}
          position="left"
        >
          <MenuList>
            <MenuItem
              contentBefore={<IconBarChart2 />}
              component={NavLink}
              to="/dashboard/moisture"
              activeClassName="active-button"
            >
              Dashboard
            </MenuItem>
            <MenuItem
              contentBefore={<IconSliders />}
              component={NavLink}
              to="/controls"
              activeClassName="active-button"
            >
              Controls
            </MenuItem>
            <MenuItem
              contentBefore={<IconBell />}
              contentAfter={<Badge>3</Badge>}
              component={NavLink}
              to="/notifications"
              activeClassName="active-button"
            >
              Notifications
            </MenuItem>
          </MenuList>
        </Sheet>
      </Router>
    </Fragment>
  );
};

export default App;
