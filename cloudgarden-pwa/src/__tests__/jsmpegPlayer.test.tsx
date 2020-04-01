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
  const wrapper = shallow(
    <JsmpegPlayer
      wrapperClassName="video-wrapper video"
      videoUrl={"ws://url"}
      options={videoOptions}
      overlayOptions={overlayOptions}
    />
  );
  test("video player makes a canvas", async () => {
    console.log(wrapper.debug());
  });
});
