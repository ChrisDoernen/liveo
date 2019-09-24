import { Component } from "@angular/core";
import { StreamEntity, ActivationState } from "@live/entities";
import { ApplicationStateEntity } from "@live/entities";
import { ApplicationStateService } from "../../services/application-state/application-state.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public activationState = ActivationState;
  public selectedStream: StreamEntity = null;
  public applicationState: ApplicationStateEntity;
  private _isAboutOverlayHidden = true;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(
    public applicationStateService: ApplicationStateService) {
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

  public refresh(): void {
    this.applicationStateService.loadApplicationState();
  }

  public showAboutOverlay(): void {
    this.isAboutOverlayHidden = false;
  }
}
