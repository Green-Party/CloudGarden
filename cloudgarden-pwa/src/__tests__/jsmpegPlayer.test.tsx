import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JsmpegPlayer } from "../components/stream";

configure({ adapter: new Adapter() });
describe("<JsmpegPlayer />", () => {
  const videoOptions = {
    poster:
      "https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg"
  };
  const overlayOptions = {};
  let useEffect: jest.SpyInstance<
    void,
    [React.EffectCallback, (React.DependencyList | undefined)?]
  >;
  const wrapper = shallow(
    <JsmpegPlayer
      wrapperClassName="video-wrapper video"
      videoUrl="ws://url"
      options={videoOptions}
      overlayOptions={overlayOptions}
    />
  );
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
  });
  test("video player makes a canvas", async () => {
    console.log(wrapper.debug());
    expect(useEffect).toHaveBeenCalled();
  });
});
