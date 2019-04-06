import { Component, Input, OnInit } from "@angular/core";
import { L3asPlayer } from "@live/l3as";
import { UserAgentService } from "@live/services";
import { UserAgentInfo } from "@live/entities";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements OnInit {

  public _selectedStreamId: string;
  private l3asPlayer: L3asPlayer;
  private userAgentInfo: UserAgentInfo;

  constructor(userAgentService: UserAgentService) {
    this.userAgentInfo = userAgentService.userAgentInfo;
  }

  @Input()
  public set selectedStream(streamId: string) {
    if (this.l3asPlayer) {
      console.debug(`Selected stream id: ${streamId}.`);
      this._selectedStreamId = streamId;

      if (streamId) {
        this.l3asPlayer.play(streamId);
      } else {
        this.l3asPlayer.stop();
      }
    }
  }

  public ngOnInit(): void {
    this.l3asPlayer = new L3asPlayer(this.userAgentInfo);
  }
}
