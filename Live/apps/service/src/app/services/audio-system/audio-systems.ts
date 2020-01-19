export const AudioSystems = {
  win32: {
    audioModule: "dshow",
    devicePrefix: "audio="
  },
  linux: {
    audioModule: "alsa",
    devicePrefix: "hw:"
  },
  darwin: {
    audioModule: "avfoundation",
    devicePrefix: ":"
  }
};
