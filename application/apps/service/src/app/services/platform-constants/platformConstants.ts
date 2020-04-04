export const PLATFORM_CONSTANTS = {
  win32: {
    audioModule: "dshow",
    devicePrefix: "audio=",
    ipcProtocol: "\\\\.\\pipe\\"
  },
  linux: {
    audioModule: "alsa",
    devicePrefix: "hw:",
    ipcProtocol: "unix\\:"
  },
  darwin: {
    audioModule: "avfoundation",
    devicePrefix: ":",
    ipcProtocol: "unix\\:"
  }
};
