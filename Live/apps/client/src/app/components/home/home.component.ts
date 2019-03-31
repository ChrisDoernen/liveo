import { Component } from "@angular/core";
import { DataService, UserAgentService } from "@live/services";
import { StreamEntity } from "@live/entities";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public _selectedStream: StreamEntity = null;

  private _isAboutOverlayHidden = true;

  public set isAboutOverlayHidden(value: boolean) {
    this._isAboutOverlayHidden = value;
  }

  public get isAboutOverlayHidden(): boolean {
    return this._isAboutOverlayHidden;
  }

  constructor(
    public _dataService: DataService,
    private _userAgentService: UserAgentService
  ) { }

  public streamOnClick(stream: StreamEntity): void {
    console.debug(`Click event on stream ${stream.id}.`);
    if (this._selectedStream == stream) {
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
