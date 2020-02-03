/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * A link component for switching between dashboards
 */

import React from "react";
import { NavLink } from "react-router-dom";
import "../Dashboard.css";
interface TabProps {
  label: string;
  target: string;
}
const Tab: React.FC<TabProps> = ({ label, target }) => {
  return (
    <NavLink className="button" to={target} activeClassName="active-button">
      {label}
    </NavLink>
  );
};

export default Tab;
