import { Component, Input } from "@angular/core";
import { SessionEntity } from "@live/entities";

@Component({
  selector: "activated-session-tile",
  templateUrl: "./activated-session-tile.component.html",
  styleUrls: ["./activated-session-tile.component.scss"]
})
export class ActivatedSessionTileComponent {

  @Input()
  public session: SessionEntity;
}
