import React from "react";
import { NavLink } from "react-router-dom";
import "../Dashboard.css";

const Tab: React.FC<{ label: string; target: string }> = ({
  label,
  target
}) => {
  return (
    <NavLink className="button" to={target} activeClassName="active-button">
      {label}
    </NavLink>
  );
};

export default Tab;
