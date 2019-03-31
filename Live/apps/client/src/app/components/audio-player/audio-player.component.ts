import { Component, OnDestroy, Input } from "@angular/core";
import { EndpointService } from "@live/services";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements OnDestroy {
  public _selectedStreamId: string;

  @Input()
  public set selectedStream(streamId: string) {
    console.debug(`Selected stream id: ${streamId}.`);
    this._selectedStreamId = streamId;

    if (streamId) {
      Destroy3LasPlayer();
      Initialize3lasPlayer("192.168.2.119", 3000, streamId);
    } else {
      Destroy3LasPlayer();
    }
  }

  constructor(private _endpointService: EndpointService) { }

  public ngOnDestroy(): void {
    Destroy3LasPlayer();
  }
}
