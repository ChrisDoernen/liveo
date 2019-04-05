import { TestBed } from "@angular/core/testing";
import { UserAgentService } from "./user-agent.service";
import { UserAgentInfo, UserAgentDetector } from "@live/l3as";

describe("UserAgentService", () => {

  const userAgentInfo: UserAgentInfo = {
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
    webkitVer: "1.0",
    isNativeChrome: false,
    OSName: "IOS",
    BrowserName: "Safari"
  };

  const isBrowserCompatible = true;

  beforeEach(() => {
    TestBed.configureTestingModule({});

  });

  it("should be created", () => {
    const service: UserAgentService = TestBed.get(UserAgentService);
    expect(service).toBeTruthy();
  });
});
