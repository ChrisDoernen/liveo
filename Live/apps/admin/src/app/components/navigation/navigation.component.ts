import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { environment } from "../../../../src/environments/environment";
import { ConnectionState } from "../../services/connection-state/connection-state";
import { ConnectionStateService } from "../../services/connection-state/connection-state-service";
import { LifecycleState } from "../../services/connection-state/lifecycle-state";
import { WebsocketService } from "../../services/websocket/websocket.service";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit, OnDestroy {
  public version: string = environment.version;
  public revision: string = environment.revision;

  public online: boolean;
  public lifecycleState: LifecycleState;

  private _connectionStateSubscription: Subscription;

  constructor(
    public router: Router,
    public connectionStateService: ConnectionStateService,
    private _websocketService: WebsocketService) {
  }

  public ngOnInit(): void {
    this._connectionStateSubscription =
      this.connectionStateService.connectionState$.subscribe((connectionState: ConnectionState) => {
        this.online = connectionState.online;
        this.lifecycleState = connectionState.lifecycleState;
      });
  }

  public ngOnDestroy(): void {
    this._connectionStateSubscription.unsubscribe();
  }

  public checkConnectionState(): void {
    this.connectionStateService.checkConnectionState("Unknown");
    this._websocketService.reconnect();
  }
}
