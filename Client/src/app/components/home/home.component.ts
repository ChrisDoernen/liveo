import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { UserAgentService } from "src/app/services/user-agent/user-agent.service";
import { Stream } from "src/app/entities/stream.entity";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {

  private _selectedStream: Stream = null;

  public hideAboutOverlay: boolean = true;

  constructor(private _dataService: DataService,
    private _userAgentService: UserAgentService) {
  }

  public streamOnClick(stream: Stream): void {
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
    this.hideAboutOverlay = false;
  }
}
