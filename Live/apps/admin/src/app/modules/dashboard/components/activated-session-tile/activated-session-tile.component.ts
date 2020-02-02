import { Component } from "@angular/core";
import { SessionService } from "../../../shared/services/session/session.service";

@Component({
  selector: "activated-session-tile",
  templateUrl: "./activated-session-tile.component.html",
  styleUrls: ["./activated-session-tile.component.scss"]
})
export class ActivatedSessionTileComponent {

  constructor(
    public sessionService: SessionService) {
  }
}
