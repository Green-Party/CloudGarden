/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A component for the top page header including menu icon, logo and title
 */

import React from "react";
import { IconButton, IconMenu } from "sancho";
import "../Header.css";
import Logo from "./Logo";
interface HeaderProps {
  onMenuClick: Function;
}
class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div className="navigation">
        <div className="item">
          <IconButton
            variant="ghost"
            intent="primary"
            icon={<IconMenu />}
            label="Menu"
            onPress={() => this.props.onMenuClick(true)}
            color="white"
            size="lg"
          />
        </div>
        <div className="item logo">
          <Logo />
        </div>
        <div className="item">
          <h1 className="app-name">CloudGarden</h1>
        </div>
      </div>
    );
  }
}

export default Header;
