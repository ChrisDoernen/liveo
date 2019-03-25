export function GetUserAgentInfo() {
  console.debug('Evaluating user agent.');

  var ua = navigator.userAgent.toLowerCase();

  var isAndroid = ua.match('android') ? true : false;
  var isIOS = ua.match(/(ipad|iphone|ipod)/g) ? true : false;
  var isWindows = ua.match('windows') ? true : false;
  var isLinux = ua.match('android') ? false : ua.match('linux') ? true : false;
  var isBSD = ua.match('bsd') ? true : false;
  var isMacOSX = ua.match('mac osx') ? true : false;

  var isInternetExplorer = ua.match('msie') ? true : false;
  var isSafari = ua.match(/(chromium|chrome|crios)/g)
    ? false
    : ua.match('safari')
    ? true
    : false;
  var isOpera = ua.match('opera') ? true : false;
  var isChrome = ua.match(/(chromium|chrome|crios)/g) ? true : false;
  var isFirefox = ua.match('like gecko')
    ? false
    : ua.match(/(gecko|fennec|firefox)/g)
    ? true
    : false;

  var webkitVer =
    parseInt((/WebKit\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) ||
    void 0; // also match AppleWebKit
  var isNativeChrome =
    isAndroid &&
    webkitVer <= 537 &&
    navigator.vendor.toLowerCase().indexOf('google') == 0;

  var BrowserName = 'Unknown';

  if (isInternetExplorer) BrowserName = 'IE';
  else if (isSafari) BrowserName = 'Safari';
  else if (isOpera) BrowserName = 'Opera';
  else if (isChrome) BrowserName = 'Chrome';
  else if (isFirefox) BrowserName = 'Firefox';
  else if (isNativeChrome) BrowserName = 'NativeChrome';
  else BrowserName = 'Unknown';

  var OSName = 'Unknown';

  if (isAndroid) OSName = 'Android';
  else if (isIOS) OSName = 'iOS';
  else if (isWindows) OSName = 'Windows';
  else if (isLinux) OSName = 'Linux';
  else if (isBSD) OSName = 'BSD';
  else if (isMacOSX) OSName = 'MacOSX';
  else OSName = 'Unknown';

  console.debug(
    'Detected: ' +
      (OSName == 'MacOSX'
        ? 'Mac OSX'
        : OSName == 'Unknown'
        ? 'Unknown OS'
        : OSName) +
      ', ' +
      (BrowserName == 'IE'
        ? 'Internet Explorer'
        : BrowserName == 'NativeChrome'
        ? 'Chrome legacy'
        : BrowserName == 'Unknown'
        ? 'Unknown Browser'
        : BrowserName)
  );

  userAgentInfo = {
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
  };

  return userAgentInfo;
}
