import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

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

export default responsiveFontSizes(theme);
