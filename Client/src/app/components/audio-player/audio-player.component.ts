import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Stream } from "../../entities/stream.entity";
import { EndpointService } from "src/app/services/endpoint/endpoint.service";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.css"]
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

  private _selectedStream: Stream;

  @Input()
  public set selectedStream(stream: Stream) {
    this._selectedStream = stream;
    const streamId = stream ? stream.id : null;
    ChangeStream(streamId);
  }

  constructor(private _endpointService: EndpointService) {
  }

  public ngOnInit(): void {
    Initialize3lasPlayer(this._endpointService.ip, this._endpointService.port);
  }

  public ngOnDestroy(): void {
    Destroy3LasPlayer();
  }
}
