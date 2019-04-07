import { Component, Input } from "@angular/core";
import { L3asService } from "@live/services";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent {

  public selectedStreamId: string;

  constructor(private _l3asService: L3asService) {
  }

  @Input()
  public set selectedStream(streamId: string) {
    if (this._l3asService) {
      console.debug(`Selected stream id: ${streamId}.`);
      this.selectedStreamId = streamId;

      if (streamId) {
        this._l3asService.play(streamId);
      } else {
        this._l3asService.stop();
      }
    }
  }
}
