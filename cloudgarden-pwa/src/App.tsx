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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TuneIcon from "@material-ui/icons/Tune";
import "./Header.css";
import "./Dashboard.css";
import Header from "./components/Header";
import ControlView from "./components/controls/ControlView";
const Home = lazy(() => import("./Home"));
interface NavListItemProps {
  text: string;
  icon: JSX.Element;
  to: string;
}
const NavListItem = ({ text, icon, to }: NavListItemProps) => {
  return (
    <ListItem
      button
      component={NavLink}
      to={to}
      activeClassName="active-button"
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

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
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/controls">
              <ControlView />
            </Route>
          </Switch>
        </Suspense>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <List>
            <NavListItem
              to="/dashboard/moisture"
              icon={<BarChartIcon />}
              text="Dashboard"
            />
            <NavListItem to="/controls" icon={<TuneIcon />} text="Controls" />
            <NavListItem
              to="/notifications"
              icon={<NotificationsIcon />}
              text="Notifications"
            />
          </List>
        </Drawer>
      </Router>
    </Fragment>
  );
};

export default App;
