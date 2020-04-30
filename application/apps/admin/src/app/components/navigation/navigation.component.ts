import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ActivationService } from "../../services/activation/activation.service";
import { NotificationService } from "../../services/notification/notification.service";
import { WebsocketService } from "../../services/websocket/websocket.service";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {

  public version: string = environment.version;
  public revision: string = environment.revision;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _activationService: ActivationService,
    private _websocketService: WebsocketService,
    private _notificationService: NotificationService
  ) {
  }

  public ngOnInit(): void {
    this._activationService.getActivation();
    this._websocketService.initializeConnection();

    // These are actually subscriptions on events from the websocket client
    this._notificationService.subscribeServerNotifications();
  }
}
