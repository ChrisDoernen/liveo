import { Component, OnInit } from "@angular/core";
import { ActivationStateEntity, StreamEntity } from "@live/entities";
import { ActivationStateService, Logger } from "@live/services";
import { ApplicationStateService } from "../../services/application-state/application-state.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public activationState: ActivationStateEntity;

  public loading: boolean;
  public isInErrorState: boolean;

  public selectedStream: StreamEntity = null;

  private _isAboutOverlayHidden = true;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(
    private readonly _logger: Logger,
    private readonly _applicationStateService: ApplicationStateService,
    private readonly _activationStateService: ActivationStateService) {
  }

  public ngOnInit(): void {
    this.getApplicationState();
  }

  private getApplicationState(): void {
    this.loading = true;
    this._logger.info("Loading application state");
    this._applicationStateService.loadApplicationState()
      .then((activationState) => {
        this.activationState = activationState;
        this.loading = false;
        this.isInErrorState = false;
      })
      .catch((error) => {
        this.loading = false;
        this.isInErrorState = true;
      });
  }

  public selectStream(stream: StreamEntity): void {
    if (this.selectedStream === stream) {
      this.selectedStream = null;
      this._logger.info("Unselecting stream.");
    } else {
      this.selectedStream = stream;
      this._logger.info(`Selecting stream ${stream.id}.`);
    }
  }

  public refresh(): void {
    this.getApplicationState();
  }

  public showAboutOverlay(): void {
    this.isAboutOverlayHidden = false;
  }
}
