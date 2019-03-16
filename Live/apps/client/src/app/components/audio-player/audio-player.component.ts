import { Component, OnDestroy, Input } from '@angular/core';
import { EndpointService } from 'apps/client/src/app/services/endpoint/endpoint.service';

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnDestroy {
  private _selectedStreamId: string;

  @Input()
  public set selectedStream(streamId: string) {
    console.debug(`Selected stream id: ${streamId}.`);
    this._selectedStreamId = streamId;

    if (streamId) {
      Destroy3LasPlayer();
      Initialize3lasPlayer(
        this._endpointService.ip,
        this._endpointService.port,
        streamId
      );
    } else {
      Destroy3LasPlayer();
    }
  }

  constructor(private _endpointService: EndpointService) {}

  public ngOnDestroy(): void {
    Destroy3LasPlayer();
  }
}
