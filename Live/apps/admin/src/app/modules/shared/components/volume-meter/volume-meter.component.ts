import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, NgZone } from "@angular/core";
import { EVENTS } from "@live/constants";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "../../../../services/websocket/websocket.service";

@Component({
  selector: "volume-meter",
  templateUrl: "./volume-meter.component.html",
  styleUrls: ["./volume-meter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeMeterComponent implements OnInit, OnDestroy {

  @Input() public streamingId: string;
  @Input() public simpleDesign: boolean;

  public color: string;
  public inverseMeterWidth: string;
  public targetRight: string;
  public loudness: string;
  private _volumeSubscription: Subscription;

  private _scaleLowEnd: number;
  private _m: number;
  private _t: number;

  constructor(
    private readonly _websocketService: WebsocketService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _ngZone: NgZone) {
    this.initializeScale();
  }

  private initializeScale(): void {
    const scaleHighEnd = -5;
    const scaleLowEnd = -68;
    this._scaleLowEnd = scaleLowEnd;
    const target = -16;

    this._m = (100 - 0) / (scaleLowEnd - scaleHighEnd);
    this._t = 100 - (this._m * scaleLowEnd);

    const targetRight = (this._m * target) + this._t;
    this.targetRight = targetRight + "%";
  }

  public ngOnInit(): void {
    if (this.streamingId) {
      this._ngZone.runOutsideAngular(() => {
        this._volumeSubscription =
          this._websocketService.fromEvent<string>(`${EVENTS.streamVolume}-${this.streamingId}`)
            .subscribe((loudness) => {
              this.loudness = loudness;
              this.inverseMeterWidth = this.getInverseBarWidth(parseFloat(loudness));
              this._changeDetectorRef.markForCheck();
            });
      });
    }
  }

  public ngOnDestroy(): void {
    this._volumeSubscription.unsubscribe();
  }

  private getInverseBarWidth(loudness: number): string {
    const y = (this._m * loudness) + this._t;
    const widthInPercent = Math.min(y, 100);

    return widthInPercent.toString() + "%";
  }
}
