import { TestBed } from "@angular/core/testing";
import { UserAgentService } from "./user-agent.service";

describe("UserAgentService", () => {
  let userAgent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    userAgent = jest.spyOn(window.navigator, "userAgent", "get")
  });

  it("should be created", () => {
    const service: UserAgentService = TestBed.get(UserAgentService);
    expect(service).toBeTruthy();
  });

  it("should load some values", () => {
    const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    userAgent.mockReturnValue(ua);

    const expectesUserAgentInfo = {
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

    const service: UserAgentService = TestBed.get(UserAgentService);
    expect(service.userAgentInfo).toEqual(expectesUserAgentInfo);
    expect(service.isBrowserCompatible).toEqual(false);
  });
});
