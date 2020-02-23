/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * A link component for switching between dashboards
 */

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../Dashboard.css";
import { Tabs as TabsContainer, Tab } from "@material-ui/core";

interface TabsProps {
  tabValues: TabProps[];
}
interface TabProps {
  label: string;
  target: string;
}
const Tabs: React.FC<TabsProps> = ({ tabValues }: TabsProps) => {
  let location = useLocation();
  const initialValue = tabValues.map(t => t.target).indexOf(location.pathname);
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
        />
      ))}
    </TabsContainer>
  );
};

export default Tabs;
