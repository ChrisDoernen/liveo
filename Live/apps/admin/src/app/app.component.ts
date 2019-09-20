import { Component } from "@angular/core";
import { ConnectionStateService } from "./services/connection-state/connection-state-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private _connectionStateService: ConnectionStateService) {
  }
}
