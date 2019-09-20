import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../src/environments/environment";
import { ConnectionStateService } from "../../services/connection-state/connection-state-service";
import { Subscription } from "rxjs";
import { ConnectionState } from "../../services/connection-state/connection-state";
import { LifecycleState } from "../../services/connection-state/lifecycle-state";

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
    public connectionStateService: ConnectionStateService) {
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
}
