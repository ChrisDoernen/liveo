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
}
