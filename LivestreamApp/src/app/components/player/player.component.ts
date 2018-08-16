import { Component, OnInit } from '@angular/core';
import { StreamsService } from '../../services/streams-service/streams-service';
import { LiveStream } from '../../entities/live-stream.entity';
import { ActivatedRoute } from '@angular/router';
import { WindowUtilsService } from '../../services/window-utils/window-utils.service';
import { UserAgentInfo } from '../../entities/user-agent-info.entity';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  private liveStream: LiveStream;
  private logStack: string[] = [];
  private isLoading: boolean = true;

  private connectionError: boolean = false ;
  private hasError: boolean = false;

  private userAgentInfo: UserAgentInfo;
  private selectedMimeType: string;
  private audioPlayer: PCMAudioPlayer;
  private formatReader: AudioFormatReader;
  private socketClient: WebSocketClient;

  private isWebsocketConnected: boolean = false;
  private isPlaying: boolean = false;
  private packetModCounter: number = 0;

  constructor(private route: ActivatedRoute,
    private streamsService: StreamsService,
    private windowUtilService: WindowUtilsService) { 
  }

  ngOnInit() {
    this.GetLiveStream();
  }

  private GetLiveStream() {
    const id = this.route.snapshot.paramMap.get('id');
    this.streamsService.getLiveStream(id)
      .subscribe((stream) => {
        this.liveStream = stream;
      }, (error) => {
        this.connectionError = true;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.InitializePlayer();
      })
  }

  private InitializePlayer(): void {
    this.checkEnvironment();
    this.checkMimeType();
    this.initializeAudioPlayer();
    this.initializeFormatReader();
  }

  private initializeAudioPlayer(): void {
    try {
      this.audioPlayer = new PCMAudioPlayer();
      this.log("Init of PCMAudioPlayer succeeded.");
    }
    catch (e) {
      this.log("Init of PCMAudioPlayer failed: " + e);
      this.hasError = true;
    }
  }

  private initializeFormatReader(): void {
    try {
      this.formatReader = CreateAudioFormatReader(this.userAgentInfo, this.selectedMimeType, 
        this.onReaderError.bind(this), this.onReaderDataReady.bind(this));
      this.log("Init of AudioFormatReader succeeded.");
    }
    catch (e) {
      this.log("Init of AudioFormatReader failed: " + e);
      this.hasError = true;
    }
  }

  private checkMimeType(): void {
    const AudioTag = new Audio();
    var answer = AudioTag.canPlayType(this.liveStream.websocketConfig.mimeType);
    if (!(answer === "probably" || answer === "maybe")) {
          this.hasError = true;
      this.log(`Mime type "${this.liveStream.websocketConfig.mimeType}" unsupported.`);
    }
    else {
      this.selectedMimeType = this.liveStream.websocketConfig.mimeType;
      this.log(`Using mime type "${this.liveStream.websocketConfig.mimeType}" on port "${this.liveStream.websocketConfig.port}"`);
    }
  }

  private checkEnvironment(): void {
    const userAgentInfo = this.windowUtilService.getUserAgentInfo();
    this.userAgentInfo = userAgentInfo;
    this.log(`Detected ${userAgentInfo.oSName}/${userAgentInfo.browser}`);

    if (!this.windowUtilService.isWebsocketSupported) {
      this.hasError = true;
      this.log("Websocket unsupported.");
    }

    if (!this.windowUtilService.isAudioContextSupported) {
      this.hasError = true;
      this.log("Web audio unsupported.");
    }
  }

  private log(line: string): void {
    this.logStack.push(line);
    console.log(line);
  }

  private onPlay(): void {
    this.audioPlayer.MobileUnmute();
    try {
      this.socketClient = new WebSocketClient('ws://' + this.liveStream.ip + ':' + this.liveStream.websocketConfig.port.toString(), 
      this.onSocketError.bind(this), this.onSocketConnect.bind(this), this.onSocketDataReady.bind(this), this.onSocketDisconnect.bind(this));
      this.log("Init of WebSocketClient succeeded");
      this.log("Trying to connect to server.");
    }
    catch (e) {
      this.log("Init of WebSocketClient failed: " + e);
    }
  }

  private onReaderError(): void {
    this.log("Format reader error: Decoding failed.");
  }

  private onReaderDataReady(): void {
    while (this.formatReader.SamplesAvailable()) {
      this.audioPlayer.PushBuffer(this.formatReader.PopSamples());
    }
  }

  private onSocketError(error): void {
    this.log("Network error: " + error);
  }

  private onSocketConnect(): void {
    //PlayerControls.SetPlaystate(true);
    //StartFocusChecker();
    this.isWebsocketConnected = true;
    this.log("Established connection with server.");
  }

  private onSocketDisconnect(): void {
    // PlayerControls.SetPlaystate(false);
    // StopFocusChecker();
    //while(PlayerControls.ToogleActivityLight());
    this.isWebsocketConnected = false;
    this.log("Lost connection to server.");
  }

  private onSocketDataReady(data): void {
    this.packetModCounter++;
				
    if (this.packetModCounter > 100) {
      //PlayerControls.ToogleActivityLight();
      this.packetModCounter = 0;
    }

    this.formatReader.PushData(data);
  }
}
