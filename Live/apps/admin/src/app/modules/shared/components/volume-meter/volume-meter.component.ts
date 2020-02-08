import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { EVENTS } from "@live/constants";
import { Subscription } from "rxjs";
import { WebsocketService } from "../../../../services/websocket/websocket.service";
import { VolumeMeterService } from "../../services/volume-meter/volume-meter.service";

@Component({
  selector: "volume-meter",
  templateUrl: "./volume-meter.component.html",
  styleUrls: ["./volume-meter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeMeterComponent implements OnInit, OnDestroy {

  @Input() public streamingId: string;

  public color: string;
  public barWidth: string;
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
          .subscribe((loudness) => {
            this.color = this._volumeMeterService.convertLoudnessToColor(loudness);
            this.barWidth = this.getBarWidth(parseFloat(loudness));
            this._changeDetectorRef.markForCheck();
          })
    }
  }


  public ngOnDestroy(): void {
    this._volumeSubscription.unsubscribe();
  }

  private getBarWidth(loudness: number): string {
    const m = 3.44;
    const t = 69;
    const y = (m * loudness) + t;
    let widthInPercent: string;
    if (y < 0) {
      widthInPercent = "0";
    } else {
      widthInPercent = y.toString();
    }

    return widthInPercent + "%";
  }
}
