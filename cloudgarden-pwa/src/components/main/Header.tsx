/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A component for the top page header including menu icon, logo and title
 */

import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Typography,
  useTheme,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
interface HeaderProps {
  onMenuClick: Function;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      background: theme.palette.primary.light,
      border: 0,
      color: theme.palette.primary.dark,
      padding: theme.spacing(1),
      "& a": { textDecoration: "none" }
    },
    logo: {
      marginLeft: theme.spacing(3)
    }
  })
);

function Header(props: HeaderProps) {
  const classes = useStyles(useTheme());
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => props.onMenuClick(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h4"
          className={classes.root}
          component="a"
          href="/"
        >
          CloudGarden
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
