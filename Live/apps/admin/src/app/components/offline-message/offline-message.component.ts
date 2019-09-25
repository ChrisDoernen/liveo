import { Component, Input, Output } from "@angular/core";
import { LifecycleState } from "../../services/connection-state/lifecycle-state";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "offline-message",
  templateUrl: "./offline-message.component.html",
  styleUrls: ["./offline-message.component.scss"]
})
export class OfflineMessageComponent {
  @Input()
  public lifecycleState: LifecycleState;

  @Output()
  public checkConnection: EventEmitter<any> = new EventEmitter();
}
