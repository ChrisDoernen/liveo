import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { ActivationEntity, ActivationState } from "@live/entities";

@Component({
  selector: "activation-state-tile",
  templateUrl: "./activation-state-tile.component.html",
  styleUrls: ["./activation-state-tile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivationStateTileComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public activationState: ActivationState;

  @Input()
  public activation: ActivationEntity;

  public time: any;

  private _timer: any;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.checkCounting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkCounting();
  }

  private checkCounting(): void {
    if (this.activationState === "Started") {
      this.startCountingLiveTime();
    } else {
      this.stopCountingLiveTime();
    }
  }

  private startCountingLiveTime(): void {
    this._timer = setInterval(() => {
      const timeDifference = Date.now() - new Date(this.activation.startTime).getTime();
      this.time = timeDifference;

      this._changeDetectorRef.markForCheck();
    }, 1000);
  }

  private stopCountingLiveTime(): void {
    if (!this._timer) {
      return;
    }
    clearTimeout(this._timer);
  }

  public ngOnDestroy(): void {
    this.stopCountingLiveTime();
  }
}
