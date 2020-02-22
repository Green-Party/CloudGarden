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
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
  makeStyles,
  createStyles,
  useTheme
} from "@material-ui/core/styles";
import "./Header.css";
import "./Dashboard.css";
import Header from "./components/Header";
import ControlView from "./components/controls/ControlView";
import CssBaseline from "@material-ui/core/CssBaseline";

const Home = lazy(() => import("./Home"));

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8CA286",
      main: "#578C48",
      dark: "#28352E",
      contrastText: "#fff"
    },
    secondary: {
      light: "#F7E7AE",
      main: "#FFC93C",
      dark: "#FF6F3C",
      contrastText: "#28352E"
    },
    text: {
      primary: "#28352E",
      secondary: "#fff"
    },
    background: {
      paper: "#F7E7AE",
      default: "#28352E"
    }
  },
  typography: {
    fontFamily: [
      "Work Sans",
      "Space Mono",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    h1: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 300,
      fontSize: "8.6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.015em"
    },
    h2: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 300,
      fontSize: "5.4rem",
      lineHeight: 1.2,
      letterSpacing: "-0.005em"
    },
    h3: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 400,
      fontSize: "4.3rem",
      lineHeight: 1.167,
      letterSpacing: "0em"
    },
    h4: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 400,
      fontSize: "3.1rem",
      lineHeight: 1.235,
      letterSpacing: "0.0025em"
    },
    h5: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 400,
      fontSize: "2.2rem",
      lineHeight: 1.334,
      letterSpacing: "0em"
    },
    h6: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 500,
      fontSize: "1.8rem",
      lineHeight: 1.6,
      letterSpacing: "0.0015em"
    },
    subtitle1: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 400,
      fontSize: "1.4rem",
      lineHeight: 1.75,
      letterSpacing: "0.0015em"
    },
    subtitle2: {
      fontFamily: [
        "Space Mono",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      fontWeight: 500,
      fontSize: "1.3rem",
      lineHeight: 1.57,
      letterSpacing: "0.001em"
    },
    body1: {
      fontFamily: ["Work Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      ),
      fontWeight: 400,
      fontSize: "1.4rem",
      lineHeight: 1.5,
      letterSpacing: "0.005em"
    },
    body2: {
      fontFamily: ["Work Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      ),
      fontWeight: 400,
      fontSize: "1.3rem",
      lineHeight: 1.43,
      letterSpacing: "0.0025em"
    },
    button: {
      fontFamily: ["Work Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      ),
      fontWeight: 500,
      fontSize: "1.3rem",
      lineHeight: 1.75,
      letterSpacing: "0.01em",
      textTransform: "uppercase"
    },
    caption: {
      fontFamily: ["Work Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      ),
      fontWeight: 400,
      fontSize: "1.1rem",
      lineHeight: 1.66,
      letterSpacing: "0.004em"
    },
    overline: {
      fontFamily: ["Work Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      ),
      fontWeight: 400,
      fontSize: "0.9rem",
      lineHeight: 2.66,
      letterSpacing: "0.01em",
      textTransform: "uppercase"
    }
  }
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  active: {
    background: "#578C48",
    color: "white",
    "& svg": {
      fill: "white",
      stroke: "white"
    }
  },
  inactive: {
    color: "rgba(0, 0, 0, 0.54)"
  }
});

interface NavListItemProps {
  text: string;
  icon: JSX.Element;
  to: string;
  activeClassName: string;
}
const NavListItem = ({ text, icon, to, activeClassName }: NavListItemProps) => {
  return (
    <ListItem
      button
      component={NavLink}
      to={to}
      activeClassName={activeClassName}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const styles = useStyles();
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
            </Switch>
          </Suspense>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <List className={styles.inactive}>
              <NavListItem
                to="/dashboard/moisture"
                icon={<BarChartIcon />}
                text="Dashboard"
                activeClassName={styles.active}
              />
              <NavListItem
                to="/controls"
                icon={<TuneIcon />}
                text="Controls"
                activeClassName={styles.active}
              />
              <NavListItem
                to="/notifications"
                icon={<NotificationsIcon />}
                text="Notifications"
                activeClassName={styles.active}
              />
            </List>
          </Drawer>
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
