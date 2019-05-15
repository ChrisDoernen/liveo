import { Component, OnInit } from "@angular/core";
import { StreamEntity, ActivationState } from "@live/entities";
import { ActivityEntity } from "@live/entities";
import { ActivityService } from "../../services/activity/activity.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public activationState = ActivationState;
  public selectedStream: StreamEntity = null;
  public activity: ActivityEntity;
  public connectionError = false;
  private _isAboutOverlayHidden = true;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(public _activityService: ActivityService) {
  }

  public ngOnInit(): void {
    this._activityService.getActivity()
      .then((activity) => this.activity = activity)
      .catch((error) => {
        this.connectionError = true;
        console.error(error);
      });
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
