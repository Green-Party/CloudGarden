/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * A link component for switching between dashboards
 */

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Tabs as TabsContainer,
  Tab,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface TabsProps {
  tabValues: TabProps[];
}
interface TabProps {
  label: string;
  target: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    menu: {
      width: "100vw",
      backgroundColor: theme.palette.secondary.light,
      textAlign: "center"
    },
    menuItem: {
      width: "100vw",
      textAlign: "center"
    },
    popoverPaper: {
      width: "100vw",
      maxWidth: "unset",
      marginLeft: 0
    },
    tab: {
      paddingLeft: "1%",
      paddingRight: "1%"
    }
  })
);

const Tabs: React.FC<TabsProps> = ({ tabValues }: TabsProps) => {
  const mobile = !useMediaQuery("(min-width:450px)");
  let location = useLocation();
  const styles = useStyles();
  let initialValue = tabValues.map(t => t.target).indexOf(location.pathname);
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setValue(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!mobile) {
    return (
      <TabsContainer
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabValues.map((value, index) => (
          <Tab
            key={index}
            label={value.label}
            component={NavLink}
            to={value.target}
            className={styles.tab}
          />
        ))}
      </TabsContainer>
    );
  } else {
    return (
      <div className={styles.menu}>
        <Button onClick={handleClickListItem}>
          {value < 0 ? "select a sensor" : tabValues[value].label}
        </Button>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          PopoverClasses={{ paper: styles.popoverPaper }}
          marginThreshold={0}
        >
          {tabValues.map((tabValue, index) => (
            <MenuItem
              key={index}
              selected={index === value}
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleMenuItemClick(event, index)
              }
              component={NavLink}
              to={tabValue.target}
            >
              <Typography variant="overline">{tabValue.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
};

export default Tabs;
