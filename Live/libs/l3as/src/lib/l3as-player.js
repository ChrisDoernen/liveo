import WebSocketClient from "./websocket-client.js";
import PCMAudioPlayer from "./pcm-audio-player.js";
import AudioFormatReader_MPEG from "./audio-format-reader-mpeg.js";

/*
  L3asPlayer is my wrapper around 3las (https://github.com/JoJoBond/3LAS) to make it a node module.
  The "3" and "l" are switched because the angular lib naming convention (no number as first sign)
*/
function L3asPlayer(port, OnPlayerUnderrun) {
  this._PlayerControls;
  this._AudioPlayer;
  this._FormatReader;
  this._SocketClient;

  this._SelectedMIME = "audio/mpeg";
  this._SelectedPORT = port;

  this.UserAgentInfo;
  this.IsBrowserCompatible;

  this.OnPlayerUnderrun = OnPlayerUnderrun;

  // Check if page has lost focus (e.g. switching apps on mobile)
  this._LastCheckTime;
  this._FocusChecker = null;

  this._packetModCounter = 0;

  this.__GetUserAgentInfo();
  this.__CheckBrowserCompatibility();

  this.LogEvent(`Initialize 3las player with port ${this._SelectedPORT}.`);
  this.LogEvent(`Browser compatibility ${this.IsBrowserCompatible}.`);
}

// Pubic methods (external functions):
// ===================================

L3asPlayer.prototype.SetVolume() = function (value) {
  this._AudioPlayer.SetVolume(value);
}

L3asPlayer.prototype.Mute() = function () {

}

L3asPlayer.prototype.Unmute() = function () {

}

L3asPlayer.prototype.Play() = function (streamId) {
  if (!streamId) {
    throw new Error("No streamId given.");
  }

  try {
    this._AudioPlayer = new PCMAudioPlayer();
    this._AudioPlayer.UnderrunCallback = this.OnPlayerUnderrun;
    this.__LogEvent("Init of PCMAudioPlayer succeeded");
  } catch (e) {
    this.__LogEvent("Init of PCMAudioPlayer failed: " + e);
    return;
  }

  try {
    this._FormatReader = CreateAudioFormatReader(this._SelectedMIME, this.__OnReaderError, this.__OnReaderDataReady);
    this.__LogEvent("Init of AudioFormatReader succeeded");
  } catch (e) {
    this.__LogEvent("Init of AudioFormatReader failed: " + e);
    return;
  }

  if (!this._SocketClient || !this._SocketClient.GetStatus()) {
    this._AudioPlayer.MobileUnmute();
    try {
      this.__LogEvent("Play was clicked, trying to connect to server.");
      this._SocketClient = new WebSocketClient('ws://' + ServerName + ':' + SelectedPORT.toString(), streamId, OnSocketError, OnSocketConnect, OnSocketDataReady, OnSocketDisconnect);
      this.__LogEvent("Init of WebSocketClient succeeded");
      this.__LogEvent("Trying to connect to server.");
    } catch (e) {
      this.__LogEvent("Init of WebSocketClient failed: " + e);
      return;
    }
  }
}

L3asPlayer.prototype.Stop = function () {
  this.__LogEvent("Disconnecting.");
  if (this._PlayerControls) {
    this._PlayerControls.Stop();
    this._PlayerControls.RemoveEventListener();
    this._PlayerControls = null;
  }

  if (this._SocketClient) {
    this.__LogEvent("Disposing socket client.");
    this._SocketClient.Disconnect();
    this._SocketClient = null;
  }
}

// Internal callback functions
// ===========================

L3asPlayer.prototype.__CreateAudioFormatReader = function (MIME, ErrorCallback, DataReadyCallback) {
  if (typeof MIME !== "string")
    throw new Error('CreateAudioFormatReader: Invalid MIME-Type, must be string');

  // Load format handler according to MIME-Type
  switch (MIME.replace(/\s/g, "")) {
    // MPEG Audio (mp3)
    case "audio/mpeg":
    case "audio/MPA":
    case "audio/mpa-robust":
      if (!CanDecodeTypes(new Array("audio/mpeg", "audio/MPA", "audio/mpa-robust")))
        throw new Error('CreateAudioFormatReader: Browser can not decode specified MIME-Type (' + MIME + ')');

      return new AudioFormatReader_MPEG(ErrorCallback, DataReadyCallback);

    // Unknown codec
    default:
      throw new Error('CreateAudioFormatReader: Specified MIME-Type (' + MIME + ') not supported');
  }
}

// Callback functions from format reader
L3asPlayer.prototype.__OnReaderError = function () {
  this.__LogEvent("Reader error: Decoding failed.");
}

L3asPlayer.prototype.__OnReaderDataReady = function (data) {
  while (this._FormatReader.SamplesAvailable()) {
    this._AudioPlayer.PushBuffer(this._FormatReader.PopSamples());
  }
}

// Callback function from socket connection
L3asPlayer.prototype.__OnSocketError = function (error) {
  this.__LogEvent("Network error: " + error);
}

L3asPlayer.prototype.__OnSocketConnect = function () {
  this._PlayerControls.SetPlaystate(true);
  this.__StartFocusChecker();
  this.__LogEvent("Established connection with server.");
}

L3asPlayer.prototype.__OnSocketDisconnect = function () {
  this._PlayerControls.SetPlaystate(false);
  this.__StopFocusChecker();
  this.__LogEvent("Lost connection to server.");
}

L3asPlayer.prototype.__OnSocketDataReady = function (data) {
  PacketModCounter++;

  if (this._packetModCounter > 100) {
    this.__ToogleActivityLight();
    this._packetModCounter = 0;
  }

  this._FormatReader.PushData(data);
}

L3asPlayer.prototype.__ToogleActivityLight = function () {
}

// Functions for user agent infos
L3asPlayer.prototype.__GetUserAgentInfo = function () {
  this.__LogEvent("Evaluating user agent.");

  var ua = navigator.userAgent.toLowerCase();

  var isAndroid = (ua.match('android') ? true : false);
  var isIOS = (ua.match(/(ipad|iphone|ipod)/g) ? true : false);
  var isWindows = (ua.match('windows') ? true : false);
  var isLinux = (ua.match('android') ? false : (ua.match('linux') ? true : false));
  var isBSD = (ua.match('bsd') ? true : false);
  var isMacOSX = (ua.match('mac osx') ? true : false);

  var isInternetExplorer = (ua.match('msie') ? true : false);
  var isSafari = (ua.match(/(chromium|chrome|crios)/g) ? false : (ua.match('safari') ? true : false));
  var isOpera = (ua.match('opera') ? true : false);
  var isChrome = (ua.match(/(chromium|chrome|crios)/g) ? true : false);
  var isFirefox = (ua.match('like gecko') ? false : (ua.match(/(gecko|fennec|firefox)/g) ? true : false));

  var webkitVer = parseInt((/WebKit\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) || void 0; // also match AppleWebKit
  var isNativeChrome = isAndroid && webkitVer <= 537 && navigator.vendor.toLowerCase().indexOf('google') == 0;

  var BrowserName = "Unknown";

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

  var OSName = "Unknown";

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

  this.__LogEvent("Detected: " +
    (OSName == "MacOSX" ? "Mac OSX" : (OSName == "Unknown" ? "Unknown OS" : OSName)) + ", " +
    (BrowserName == "IE" ? "Internet Explorer" : (BrowserName == "NativeChrome" ? "Chrome legacy" : (BrowserName == "Unknown" ? "Unknown Browser" : BrowserName))));

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
  }

  return userAgentInfo;
}

L3asPlayer.prototype.__CheckBrowserCompatibility = function () {

  if (typeof AudioContext === "undefined" && typeof webkitAudioContext === "undefined" && typeof mozAudioContext === "undefined") {
    return false;
  }

  var AudioTag = new Audio();
  var answer = AudioTag.canPlayType("audio/mpeg");
  if (!(answer === "probably" || answer === "maybe")) {
    return false;
  }

  return true;
}

L3asPlayer.prototype.__StartFocusChecker = function () {
  if (FocusChecker == null) {
    LastCheckTime = Date.now();
    FocusChecker = window.setInterval(CheckFocus, 2000);
  }
}

L3asPlayer.prototype.__StopFocusChecker = function () {
  if (FocusChecker != null) {
    window.clearInterval(FocusChecker);
    FocusChecker = null;
  }
}

L3asPlayer.prototype.__CheckFocus = function () {
  var CheckTime = Date.now();
  // Check if focus was lost
  if (CheckTime - LastCheckTime > 10000) {
    // If so, drop all samples in the buffer
    LogEvent("Focus lost, purging format reader.")
    FormatReader.PurgeData();
  }
  LastCheckTime = CheckTime;
}

L3asPlayer.prototype.__LogEvent = function (message) {
  console.log(message);
}
