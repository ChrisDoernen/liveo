import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
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
  public loudness: string;
  private _volumeSubscription: Subscription;

  private _scaleLowEnd: number;
  private _m: number;
  private _t: number;

  constructor(
    private readonly _websocketService: WebsocketService,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
    this.initializeScale();
  }

  private initializeScale(): void {
    const scaleHighEnd = -5;
    const scaleLowEnd = -68;
    this._scaleLowEnd = scaleLowEnd;

    this._m = (100 - 0) / (scaleLowEnd - scaleHighEnd);
    this._t = 100 - (this._m * scaleLowEnd);
  }

  public ngOnInit(): void {
    if (this.streamingId) {
      this._volumeSubscription =
        this._websocketService.fromEvent<string>(`${EVENTS.streamVolume}-${this.streamingId}`)
          .pipe(map((value) => this.scaleLoudnessValue(value)))
          .subscribe((loudness) => {
            this.loudness = loudness.toFixed(1);
            this.inverseMeterWidth = this.getInverseBarWidth(loudness);
            this._changeDetectorRef.markForCheck();
          });
    }
  }

  /**
   * Converts relative LU value to absolute LUFS value.
   * The input is based on a EBU R128 +9 scale, having a target of -23 LUFS as default.
   * To be able to adjust scale and target, we have to normalize to the absolute +18 scale.
   * @param value Momentary loudness (M) in LU (relative) 
   */
  private scaleLoudnessValue(value: string): number {
    const mLUScale9 = parseFloat(value);
    const mLUScale18 = mLUScale9 * 2;
    const mLUFSScale18 = mLUScale18 - 23;

    return mLUFSScale18;
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
