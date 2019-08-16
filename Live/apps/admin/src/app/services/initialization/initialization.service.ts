import { ActivationService } from "../activation/activation.service";
import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(
    private _activationService: ActivationService,
    private _websocketService: WebsocketService) {
  }

  public initialize(): void {
    this._activationService.getActivation();
    this._websocketService.initializeConnection();
  }
}