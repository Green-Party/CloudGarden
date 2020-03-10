import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

interface PlayerProps {
  wrapperClassName: string;
  videoUrl: string;
  options?: any;
  overlayOptions?: any;
}

interface ElementProps {
  videoWrapper: HTMLDivElement | null;
}

const JsmpegPlayer: React.FC<PlayerProps> = props => {
  let els: ElementProps = {
    videoWrapper: null
  };

  useEffect(() => {
    // Reference documentation, pay attention to the order of parameters.
    // https://github.com/cycjimmy/jsmpeg-player#usage
    new JSMpeg.VideoElement(
      els.videoWrapper,
      props.videoUrl,
      props.options,
      props.overlayOptions
    );
  }, []);

  return (
    <div
      className={props.wrapperClassName}
      ref={videoWrapper => (els.videoWrapper = videoWrapper)}
    ></div>
  );
};

export default JsmpegPlayer;
