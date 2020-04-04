import { UserAgentDetector } from "./user-agent-detector";

describe("UserAgentDetector", () => {
  let userAgent;

  beforeEach(() => {
    userAgent = jest.spyOn(window.navigator, "userAgent", "get");
  });

  it("should construct", () => {
    const userAgentDetector = new UserAgentDetector();
    expect(userAgentDetector).toBeTruthy();
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

    const userAgentDetector = new UserAgentDetector();
    expect(userAgentDetector.detectUserAgent()).toEqual(expectedUserAgentInfo);
    expect(userAgentDetector.checkBrowserCompatibility()).toEqual(false);
  });
});
