export const AudioSystems = {
  win32: {
    audioSystem: "dshow",
    devicePrefix: "audio="
  },
  linux: {
    audioSystem: "alsa",
    devicePrefix: "hw:"
  },
  darwin: {
    audioSystem: "avfoundation",
    devicePrefix: ":"
  }
};
