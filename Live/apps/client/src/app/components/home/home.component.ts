import { Component, OnInit } from "@angular/core";
import { ActivityService, L3asService } from "@live/services";
import { StreamEntity, ActivityEntity, ActivationState } from "@live/entities";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public activity: ActivityEntity;
  public activationState = ActivationState;
  public _selectedStream: StreamEntity = null;
  private _isAboutOverlayHidden = true;
  public connectionError: boolean;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(public _activityService: ActivityService,
    private _l3asService: L3asService) {
  }

  public ngOnInit() {
    this.loadActivity();
  }

  private loadActivity() {
    this.activity = this._activityService.activity;
    this.connectionError = this._activityService.connectionError;
  }

  public streamOnClick(stream: StreamEntity): void {
    console.debug(`Click event on stream ${stream.id}.`);
    if (this._selectedStream === stream) {
      this._selectedStream = null;
      console.debug("Unselecting stream.");
    } else {
      this._selectedStream = stream;
      console.debug(`Selecting stream ${stream.id}.`);
    }
  }

  public showAboutOverlay(): void {
    this.isAboutOverlayHidden = false;
  }
}
