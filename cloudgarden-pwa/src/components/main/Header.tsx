/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A component for the top page header including menu icon, logo and title
 */

import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Button,
  IconButton,
  Typography,
  useTheme,
  AppBar,
  Toolbar,
  MenuItem,
  Menu
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useAuth0 } from "../../contexts";

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
      flexGrow: 1,
      "& a": { textDecoration: "none" }
    },
    logo: {
      marginLeft: theme.spacing(3)
    }
  })
);

function Header(props: HeaderProps) {
  const classes = useStyles(useTheme());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const open = Boolean(anchorEl);

  const UserImage: React.FC<any> = ({ user }: any) => {
    return (
      <span className="user-info">
        <img
          src={user.picture}
          alt="Profile"
          className="nav-user-profile d-inline-block rounded-circle mr-3"
          width="50"
        />
        <h6 className="d-inline-block">{user.name}</h6>
      </span>
    );
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };
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
        {!isAuthenticated && (
          <Button color="inherit" onClick={() => loginWithRedirect({})}>
            Login
          </Button>
        )}
        {isAuthenticated && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <UserImage user={user} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
