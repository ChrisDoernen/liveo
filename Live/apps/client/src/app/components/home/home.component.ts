import { Component, OnInit } from "@angular/core";
import { ActivityService } from "@live/services";
import { StreamEntity, ActivityEntity, ActivationState } from "@live/entities";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public activationState = ActivationState;
  public selectedStream: StreamEntity = null;
  private _isAboutOverlayHidden = true;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(public _activityService: ActivityService) {
  }

  public selectStream(stream: StreamEntity): void {
    if (this.selectedStream === stream) {
      this.selectedStream = null;
      console.debug("Unselecting stream.");
    } else {
      this.selectedStream = stream;
      console.debug(`Selecting stream ${stream.id}.`);
    }
  }

  public showAboutOverlay(): void {
    this.isAboutOverlayHidden = false;
  }
}
