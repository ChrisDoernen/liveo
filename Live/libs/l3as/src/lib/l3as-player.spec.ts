import { L3asPlayer } from "./l3as-player";

describe("L3asPlayer", () => {
  let userAgent;

  beforeEach(() => {
    userAgent = jest.spyOn(window.navigator, "userAgent", "get");
  });

  it("should construct", () => {
    const l3asPlayer = new L3asPlayer();
    expect(l3asPlayer).toBeTruthy();
  });

  it("should load some values", () => {
    const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    userAgent.mockReturnValue(ua);

    const expectedUserAgentInfo = {
      isAndroid: false,
      isIOS: true,
      isWindows: false,
      isLinux: false,
      isBSD: false,
      isMacOSX: false,
      isInternetExplorer: false,
      isSafari: true,
      isOpera: false,
      isChrome: false,
      isFirefox: false,
      webkitVer: undefined,
      isNativeChrome: false,
      OSName: "iOS",
      BrowserName: "Safari"
    };

    const l3asPlayer = new L3asPlayer();
    expect(l3asPlayer.userAgentInfo).toEqual(expectedUserAgentInfo);
    expect(l3asPlayer.isBrowserCompatible).toEqual(false);
  });
});
