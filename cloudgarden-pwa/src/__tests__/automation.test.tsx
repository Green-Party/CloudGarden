import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserInput from "../components/userInput/UserInput";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });
describe("<UserAutomationView />", () => {
  const onSubmitMock = jest.fn();
  const onTurnOffMock = jest.fn();
  const mockControlState = {
    automationDashboard: {
      moisture: {
        moistureAutomation: false,
        selectedNumber: ""
      },
      light: {
        lightAutomation: false,
        selectedStartTime: null,
        selectedEndTime: null
      }
    }
  };
  let wrapper = mount(
    <UserInput
      onSubmit={onSubmitMock}
      onTurnOff={onTurnOffMock}
      type="MOISTURE"
      inputState={
        mockControlState.automationDashboard.moisture.moistureAutomation
      }
      selectedStartTime={null}
      selectedEndTime={null}
      selectedNumber={
        mockControlState.automationDashboard.moisture.selectedNumber
      }
      updateLightAutomation={jest.fn()}
      updateMoistureAutomation={jest.fn()}
    />
  );
  test("Toggle disabled by default", async () => {
    expect(wrapper.find("Input").props().disabled).toBeFalsy();
  });
  test("Submit button disabled when moisture level empty", async () => {
    act(() => {
      wrapper.find('input[type="checkbox"]').simulate("click");
    });
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
        inputState={mockControlState.automationDashboard.light.lightAutomation}
        selectedStartTime={
          mockControlState.automationDashboard.light.selectedStartTime
        }
        selectedEndTime={
          mockControlState.automationDashboard.light.selectedEndTime
        }
        selectedNumber=""
        updateLightAutomation={jest.fn()}
        updateMoistureAutomation={jest.fn()}
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
