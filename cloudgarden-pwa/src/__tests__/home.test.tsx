import React from "react";
import * as RR from "react-router-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../Home";
import Header from "../components/main/Header";

configure({ adapter: new Adapter() });

describe("<Header />", () => {
  const onMenuClickMock = jest.fn();
  jest.spyOn(RR, "useRouteMatch").mockReturnValue({
    path: "localhost:3000/dashboard",
    params: { param: "" },
    isExact: false,
    url: ""
  });
  const header = mount(<Header onMenuClick={onMenuClickMock} />);
  const home = shallow(<Home />);
  test("login button displaed when not authenticated", async () => {
    expect(header.find('button[id="login-button"]').length).toEqual(1);
  });
  test("login button replaced with name when authenticated", async () => {
    console.log(home.state());
  });
});
