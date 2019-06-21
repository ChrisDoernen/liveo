import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EVENTS } from "@live/constants";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class SystemMonitoringService {

  constructor(private _websocketService: WebsocketService) {
  }

  public getCPUUsage(): Observable<string> {
    
    return this._websocketService.fromEvent<string>(EVENTS.cpuUsage);
  }
}
