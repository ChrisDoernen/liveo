import { Component, Input, OnInit } from "@angular/core";
import { L3asPlayer } from "@live/l3as";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements OnInit {

  public _selectedStreamId: string;

  private l3asPlayer: L3asPlayer;

  @Input()
  public set selectedStream(streamId: string) {
    console.debug(`Selected stream id: ${streamId}.`);
    this._selectedStreamId = streamId;

    if (streamId) {
      this.l3asPlayer.play(streamId);
    } else {
      this.l3asPlayer.stop();
    }
  }

  public ngOnInit(): void {
    this.l3asPlayer = new L3asPlayer();
  }
}
