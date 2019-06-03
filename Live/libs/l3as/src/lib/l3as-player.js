import WebSocketClient from "./websocket-client.js";
import PCMAudioPlayer from "./pcm-audio-player.js";
import AudioFormatReader_MPEG from "./audio-format-reader-mpeg.js";

/*
  L3asPlayer is my wrapper around 3las (https://github.com/JoJoBond/3LAS) to make it a node module.
  The "3" and "l" are switched because the angular lib naming convention (no number as first sign)
*/
export class L3asPlayer {

  constructor(StreamEndedExpectedCallback, StreamEndedUnexpectedCallback) {
    this.audioPlayer;
    this.formatReader;
    this.socketClient;
    this.mime = "audio/mpeg";
    this.packetModCounter = 0;
    this.lastVolume;
    this.isPlaying;
    this.muted;
    this.userAgentInfo = this.detectUserAgent();
    this.isBrowserCompatible = this.checkBrowserCompatibility();

    this._StreamEndedExpectedCallback = StreamEndedExpectedCallback;
    this._StreamEndedUnexpectedCallback = StreamEndedUnexpectedCallback;

    this.logEvent(`Initialized 3las player.`);
  }

  // Pubic methods (external functions):
  // ===================================

  setVolume(value) {
    this.lastVolume = value;
    if (this.audioPlayer && !this.muted) {
      this.audioPlayer.SetVolume(value);
    }
  }

  mute() {
    if (this.audioPlayer) {
      console.debug("L3asPlayer: mute.");
      this.audioPlayer.SetVolume(0);
      this.muted = true;
    }
  }

  unmute() {
    if (this.audioPlayer) {
      console.debug(`L3asPlayer: unmute, last volume: ${this.lastVolume}.`);
      this.audioPlayer.SetVolume(this.lastVolume);
      this.muted = false;
    }
  }

  play(streamId) {
    if (!streamId) {
      throw new Error("No streamId given.");
    }

    try {
      this.audioPlayer = new PCMAudioPlayer();
      this.audioPlayer.SetVolume(this.lastVolume);
      this.audioPlayer.UnderrunCallback = this.onPlayerUnderrun.bind(this);
      this.logEvent("Init of PCMAudioPlayer succeeded");
    } catch (e) {
      this.logEvent("Init of PCMAudioPlayer failed: " + e);
      return;
    }

    try {
      this.formatReader = this.createAudioFormatReader(this.mime, this.onReaderError.bind(this),
        this.onReaderDataReady.bind(this));
      this.logEvent("Init of AudioFormatReader succeeded");
    } catch (e) {
      this.logEvent("Init of AudioFormatReader failed: " + e);
      return;
    }

    if (!this.socketClient || !this.socketClient.GetStatus()) {
      this.audioPlayer.MobileUnmute();
      try {
        this.logEvent("Play was clicked, trying to connect to server.");
        this.socketClient = new WebSocketClient(streamId, this.onSocketError.bind(this), this.onSocketConnect.bind(this),
          this.onSocketDataReady.bind(this), this.onSocketDisconnect.bind(this),
          this.onStreamEndedExpected.bind(this), this.onStreamEndedUnexpected.bind(this));
        this.logEvent("Init of WebSocketClient succeeded");
        this.logEvent("Trying to connect to server.");
      } catch (e) {
        this.logEvent("Init of WebSocketClient failed: " + e);
        return;
      }
    }

    this.isPlaying = true;
  }

  stop() {
    this.logEvent("Disconnecting.");

    if (this.socketClient) {
      this.logEvent("Disposing socket client.");
      this.socketClient.Disconnect();
      this.socketClient = null;
    }

    this.formatReader.PurgeData();
    this.isPlaying = false;
  }

  // Internal callback functions
  // ===========================

  createAudioFormatReader(mime, errorCallback, dataReadyCallback) {
    if (typeof mime !== "string")
      throw new Error('CreateAudioFormatReader: Invalid mime-Type, must be string');

    // Load format handler according to mime-Type
    switch (mime.replace(/\s/g, "")) {
      // MPEG Audio (mp3)
      case "audio/mpeg":
      case "audio/MPA":
      case "audio/mpa-robust":
        if (!this.canDecodeTypes(new Array("audio/mpeg", "audio/MPA", "audio/mpa-robust")))
          throw new Error('CreateAudioFormatReader: Browser can not decode specified mime-Type (' + mime + ')');

        return new AudioFormatReader_MPEG(this.userAgentInfo, errorCallback, dataReadyCallback);

      // Unknown codec
      default:
        throw new Error('CreateAudioFormatReader: Specified mime-Type (' + mime + ') not supported');
    }
  }

  canDecodeTypes(MIMETypes) {
    var AudioTag = new Audio();

    for (var i = 0; i < MIMETypes.length; i++) {
      var answer = AudioTag.canPlayType(MIMETypes[i]);
      if (answer === "probably" || answer === "maybe")
        return true;
    }
    return false;
  }

  // Callback functions from format reader
  onReaderError() {
    this.logEvent("Reader error: Decoding failed.");
  }

  onReaderDataReady(data) {
    while (this.formatReader.SamplesAvailable()) {
      this.audioPlayer.PushBuffer(this.formatReader.PopSamples());
    }
  }

  onPlayerUnderrun() {
    this.logEvent("Player underrun");
  }

  // Callback function from socket connection
  onSocketError(error) {
    this.logEvent("Network error: " + error);
  }

  onStreamEndedExpected() {
    this._StreamEndedExpectedCallback();
    this.logEvent("Stream ended as expected.");
  }

  onStreamEndedUnexpected() {
    this._StreamEndedUnexpectedCallback();
    this.logEvent("Stream ended unexpected.");
  }

  onSocketConnect() {
    this.logEvent("Established connection with server.");
  }

  onSocketDisconnect() {
    this.logEvent("Lost connection to server.");
  }

  onSocketDataReady(data) {
    this.packetModCounter++;

    if (this.packetModCounter > 100) {
      this.toogleActivityLight();
      this.packetModCounter = 0;
    }

    this.formatReader.PushData(data);
  }

  toogleActivityLight() {
  }

  logEvent(message) {
    console.log(message);
  }

  detectUserAgent() {
    console.debug("Evaluating user agent.");

    const ua = window.navigator.userAgent.toLowerCase();

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

  checkBrowserCompatibility() {
    if (typeof AudioContext === "undefined") {
      return false;
    } else if (typeof webkitAudioContext === "undefined") {
      return false;
    } else if (typeof mozAudioContext === "undefined") {
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
