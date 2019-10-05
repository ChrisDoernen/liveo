import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConnectionStateService } from "../../services/connection-state/connection-state-service";

@Component({
  selector: "offline-message",
  templateUrl: "./offline-message.component.html",
  styleUrls: ["./offline-message.component.scss"]
})
export class OfflineMessageComponent implements OnInit {

  public shutdown = false;

  constructor(
    private _route: ActivatedRoute,
    private _connectionStateService: ConnectionStateService) {
  }

  public ngOnInit(): void {
    this.shutdown = this._route.snapshot.queryParams.shutdown === "true";
  }

  public reconnect(): void {
    this.shutdown = false;
    this._connectionStateService.checkOnlineAndNavigate();
  }
}
