const NODE_COMMAND = "node";
const STREAM_RELAY = "websocket-relay.js";
const SECRET = "superSecret";
const STREAM_COMMAND = "ffmpeg";
const FFMPEG_ARGS = `-f v4l2 \
-framerate 25 -video_size 640x480 -i /dev/video0 \
-f mpegts \
-codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 \
http://localhost:8081/${SECRET}`;

module.exports = {
  NODE_COMMAND,
  STREAM_RELAY,
  SECRET,
  STREAM_COMMAND,
  FFMPEG_ARGS
};
