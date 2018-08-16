import { Component, OnInit } from '@angular/core';
import { StreamsService } from '../../services/streams-service/streams-service';
import { LiveStream } from '../../entities/live-stream.entity';
import { ActivatedRoute } from '@angular/router';
import { WindowUtilsService } from '../../services/window-utils/window-utils.service';

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
    const userAgentInfo = this.windowUtilService.getUserAgentInfo();
    this.log(`Detected ${userAgentInfo.OSName}/${userAgentInfo.Browser}`);

    if(!this.windowUtilService.isWebsocketSupported){
      this.hasError = true;
      this.log("Websocket unsupported.");
    }

    if(!this.windowUtilService.isAudioContextSupported){
      this.hasError = true;
      this.log("Web audio unsupported.");
    }

    const AudioTag = new Audio();
    var answer = AudioTag.canPlayType(this.liveStream.websocketConfig.mimeType);
    if (!(answer === "probably" || answer === "maybe"))
    {
      this.hasError = true;
      this.log(`Mime type "${this.liveStream.websocketConfig.mimeType}" unsupported.`);
    }

    this.log(`Using mime type "${this.liveStream.websocketConfig.mimeType}" on port "${this.liveStream.websocketConfig.port}"`);

    try
    {
      const playerControls = new HTMLPlayerControls("playercontrols");
      playerControls.OnPlayClick = OnControlsPlay;
      playerControls.OnVolumeChange = OnControlsVolumeChange;
      this.log("Init of HTMLPlayerControls succeeded");
    }
    catch (e)
    {
      this.log("Init of HTMLPlayerControls failed: " + e);
      this.hasError = true;
    }

    debugger;
    const playerControls = new HTMLPlayerControls("playercontrols");
    debugger;

    
  }

  private log(line: string): void {
    this.logStack.push(line);
    console.log(line);
  }

  private onPlay(): void {
    debugger;
  }
}
