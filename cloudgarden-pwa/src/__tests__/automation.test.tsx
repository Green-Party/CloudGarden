import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserInput from "../components/userInput/UserInput";

configure({ adapter: new Adapter() });
describe("<UserAutomationView />", () => {
  const onSubmitMock = jest.fn();
  const onTurnOffMock = jest.fn();
  let wrapper = mount(
    <UserInput
      onSubmit={onSubmitMock}
      onTurnOff={onTurnOffMock}
      type="MOISTURE"
    />
  );
  test("Toggle disabled by default", async () => {
    expect(wrapper.find("Input").props().disabled).toBeFalsy();
  });
  test("Submit button disabled when moisture level empty", async () => {
    wrapper.find('input[type="checkbox"]').simulate("click");
    expect(wrapper.find("Input").prop("disabled")).toBeFalsy();
    expect(
      wrapper
        .find("Input")
        .find("button")
        .prop("disabled")
    ).toBeTruthy();
    wrapper.unmount();
  });
  test("Submit button disabled when date not filled", async () => {
    wrapper = mount(
      <UserInput
        onSubmit={onSubmitMock}
        onTurnOff={onTurnOffMock}
        type="LIGHT"
      />
    );
    wrapper.find('input[type="checkbox"]').simulate("click");
    expect(wrapper.find("Input").prop("disabled")).toBeFalsy();
    expect(
      wrapper
        .find("Input")
        .find("button")
        .find('[id="submit-button"]')
        .prop("disabled")
    ).toBeTruthy();
    wrapper.unmount();
  });
});
