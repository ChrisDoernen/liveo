import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { EVENTS } from "@live/constants";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "../../../../services/websocket/websocket.service";

@Component({
  selector: "simple-volume-meter",
  templateUrl: "./simple-volume-meter.component.html",
  styleUrls: ["./simple-volume-meter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleVolumeMeterComponent implements OnInit, OnDestroy {

  @Input() public streamingId: string;

  private _volumeColorScale = [
    [-20, "#326da8"],
    [-19, "#326da8"],
    [-18, "#326da8"],
    [-17, "#326da8"],
    [-16, "#326da8"],
    [-15, "#326da8"],
    [-14, "#4ca832"],
    [-13, "#4ca832"],
    [-12, "#4ca832"],
    [-11, "#4ca832"],
    [-10, "#4ca832"],
    [-9, "#4ca832"],
    [-8, "#4ca832"],
    [-7, "#4ca832"],
    [-6, "#4ca832"],
    [-5, "#4ca832"],
    [-4, "#4ca832"],
    [-3, "#8ca832"],
    [-2, "#8ca832"],
    [-1, "#8ca832"],
    [0, "#8ca832"],
    [1, "#8ca832"],
    [2, "#8ca832"],
    [3, "#a83232"],
    [4, "#a83232"],
    [5, "#a83232"],
    [6, "#a83232"],
    [7, "#a83232"],
    [8, "#a83232"],
    [9, "#a83232"]
  ];

  public color: string;
  private _volumeSubscription: Subscription;

  constructor(
    private readonly _websocketService: WebsocketService,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    if (this.streamingId) {
      this._volumeSubscription =
        this._websocketService.fromEvent<string>(`${EVENTS.streamVolume}-${this.streamingId}`)
          .pipe(
            map((data) => this.convertLoudnessToColor(data)))
          .subscribe((color) => {
            this.color = color;
            this._changeDetectorRef.markForCheck();
          })
    }
  }

  private convertLoudnessToColor(value: string): string {
    const number = parseFloat(value);
    const rounded = Math.round(number);
    const scaleLength = this._volumeColorScale.length;
    if (rounded < this._volumeColorScale[0][0]) {
      return this._volumeColorScale[0][1] as string;
    }
    if (rounded > this._volumeColorScale[scaleLength - 1][0]) {
      return this._volumeColorScale[scaleLength - 1][1] as string;
    }
    return this._volumeColorScale[rounded + 20][1] as string;
  }

  public ngOnDestroy(): void {
    this._volumeSubscription.unsubscribe();
  }
}
