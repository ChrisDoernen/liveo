import { Component, Input } from "@angular/core";
import { LifecycleState } from "../../services/connection-state/lifecycle-state";

@Component({
  selector: "offline-message",
  templateUrl: "./offline-message.component.html",
  styleUrls: ["./offline-message.component.scss"]
})
export class OfflineMessageComponent {
  @Input()
  public lifecycleState: LifecycleState;

}
