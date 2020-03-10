/**
 * Creation Date: February 22, 2020
 * Author: Gillian Pierce
 * Holds the side navigation drawer with main app pages
 */
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import VideocamIcon from "@material-ui/icons/Videocam";
import TuneIcon from "@material-ui/icons/Tune";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

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

interface NavDrawerProps {
  open: boolean;
  onCloseFunc: Function;
}

const NavDrawer: React.FC<NavDrawerProps> = ({
  open,
  onCloseFunc
}: NavDrawerProps) => {
  const styles = useStyles();
  return (
    <Drawer open={open} onClose={() => onCloseFunc(false)}>
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
        <NavListItem
          to="/stream"
          icon={<VideocamIcon />}
          text="Live Stream"
          activeClassName={styles.active}
        />
      </List>
    </Drawer>
  );
};

export default NavDrawer;
