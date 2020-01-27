/** @jsx jsx */
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
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
const About = lazy(() => import("./About"));
const Home = lazy(() => import("./Home"));

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Header onMenuClick={setOpen} />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/about">
              <About title="normal about" />
            </Route>
            <Route path="/dashboard">
              <Home />
            </Route>
            <Route path="/">
              <Home />
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
    </React.Fragment>
  );
};

export default App;
