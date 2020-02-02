import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { EVENTS } from "@live/constants";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { VolumeMeterService } from "../../services/volume-meter/volume-meter.service";
import { WebsocketService } from "../../services/websocket/websocket.service";

@Component({
  selector: "simple-volume-meter",
  templateUrl: "./simple-volume-meter.component.html",
  styleUrls: ["./simple-volume-meter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleVolumeMeterComponent implements OnInit, OnDestroy {

  @Input() public streamingId: string;

  public color: string;
  private _volumeSubscription: Subscription;

  constructor(
    private readonly _websocketService: WebsocketService,
    private readonly _volumeMeterService: VolumeMeterService,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    if (this.streamingId) {
      this._volumeSubscription =
        this._websocketService.fromEvent<string>(`${EVENTS.streamVolume}-${this.streamingId}`)
          .pipe(
            map((data) => this._volumeMeterService.convertLoudnessToColor(data)))
          .subscribe((color) => {
            this.color = color;
            this._changeDetectorRef.markForCheck();
          })
    }
  }


  public ngOnDestroy(): void {
    this._volumeSubscription.unsubscribe();
  }
}
