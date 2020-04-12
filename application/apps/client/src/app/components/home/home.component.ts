import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivationStateEntity, StreamEntity } from "@liveo/entities";
import { Logger } from "@liveo/services";
import { ApplicationStateService } from "../../services/application-state/application-state.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  @HostBinding('style.height')
  public innerHeight: string;

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
    private readonly _applicationStateService: ApplicationStateService
  ) {
  }

  public ngOnInit(): void {
    this.getApplicationState();
    this.innerHeight = window.innerHeight + "px";
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
