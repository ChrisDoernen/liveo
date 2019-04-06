import { Injectable } from "@angular/core";
import { UserAgentInfo } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {
  public userAgentInfo: UserAgentInfo;
  public isBrowserCompatible: boolean;

  constructor() {
    this.userAgentInfo = this.detectUserAgent();
    this.isBrowserCompatible = this.checkBrowserCompatibility();
  }

  private detectUserAgent(): UserAgentInfo {
    console.debug("Evaluating user agent.");

    const ua = navigator.userAgent.toLowerCase();

    const isAndroid = (ua.match("android") ? true : false);
    const isIOS = (ua.match(/(ipad|iphone|ipod)/g) ? true : false);
    const isWindows = (ua.match("windows") ? true : false);
    const isLinux = (ua.match("android") ? false : (ua.match("linux") ? true : false));
    const isBSD = (ua.match("bsd") ? true : false);
    const isMacOSX = (ua.match("mac osx") ? true : false);

    const isInternetExplorer = (ua.match("msie") ? true : false);
    const isSafari = (ua.match(/(chromium|chrome|crios)/g) ? false : (ua.match("safari") ? true : false));
    const isOpera = (ua.match("opera") ? true : false);
    const isChrome = (ua.match(/(chromium|chrome|crios)/g) ? true : false);
    const isFirefox = (ua.match("like gecko") ? false : (ua.match(/(gecko|fennec|firefox)/g) ? true : false));

    const webkitVer = parseInt((/WebKit\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) || void 0; // also match AppleWebKit
    const isNativeChrome = isAndroid && webkitVer <= 537 && navigator.vendor.toLowerCase().indexOf("google") === 0;

    let BrowserName = "Unknown";

    if (isInternetExplorer)
      BrowserName = "IE";
    else if (isSafari)
      BrowserName = "Safari";
    else if (isOpera)
      BrowserName = "Opera";
    else if (isChrome)
      BrowserName = "Chrome";
    else if (isFirefox)
      BrowserName = "Firefox";
    else if (isNativeChrome)
      BrowserName = "NativeChrome";
    else
      BrowserName = "Unknown";

    let OSName = "Unknown";

    if (isAndroid)
      OSName = "Android";
    else if (isIOS)
      OSName = "iOS";
    else if (isWindows)
      OSName = "Windows";
    else if (isLinux)
      OSName = "Linux";
    else if (isBSD)
      OSName = "BSD";
    else if (isMacOSX)
      OSName = "MacOSX";
    else
      OSName = "Unknown";

    console.debug("Detected: " +
      (OSName === "MacOSX" ? "Mac OSX" : (OSName === "Unknown" ? "Unknown OS" : OSName)) + ", " +
      (BrowserName === "IE" ? "Internet Explorer" : (BrowserName === "NativeChrome" ? "Chrome legacy" : (BrowserName === "Unknown" ? "Unknown Browser" : BrowserName))));

    return {
      isAndroid,
      isIOS,
      isWindows,
      isLinux,
      isBSD,
      isMacOSX,
      isInternetExplorer,
      isSafari,
      isOpera,
      isChrome,
      isFirefox,
      webkitVer,
      isNativeChrome,
      OSName,
      BrowserName
    }
  }

  private checkBrowserCompatibility(): boolean {

    if (typeof AudioContext === "undefined") {
      return false;
    }

    const AudioTag = new Audio();
    const answer = AudioTag.canPlayType("audio/mpeg");
    if (!(answer === "probably" || answer === "maybe")) {
      return false;
    }

    return true;
  }
}
