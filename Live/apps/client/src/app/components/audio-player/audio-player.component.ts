import { Component, Input } from "@angular/core";
import { AudioPlayerService } from "@live/services";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent {
  public _selectedStreamId: string;

  @Input()
  public set selectedStream(streamId: string) {
    console.debug(`Selected stream id: ${streamId}.`);
    this._selectedStreamId = streamId;

    if (streamId) {
      this.audioPlayerService.play(streamId);
    } else {
      this.audioPlayerService.stop();
    }
  }

  constructor(private audioPlayerService: AudioPlayerService) { }
}
