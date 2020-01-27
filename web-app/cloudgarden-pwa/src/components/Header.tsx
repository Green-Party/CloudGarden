import React from "react";
import { IconButton, IconMenu, Text } from "sancho";
import "../Header.css";
import Logo from "./Logo";
class Header extends React.Component<{ onMenuClick: Function }> {
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
          <Text variant="display2" css={{ color: "white" }}>
            CloudGarden
          </Text>
        </div>
      </div>
    );
  }
}

export default Header;
