import { Injectable } from "@angular/core";
import { EVENTS } from "@live/constants";
import { ReplaySubject } from "rxjs";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class SystemMonitoringService {

  private _cpuUsage = new ReplaySubject<string>();
  public cpuUsage$ = this._cpuUsage.asObservable();

  constructor(
    private _websocketService: WebsocketService) {
  }

  public subscribeCpuUsage(): void {
    this._websocketService.fromEvent<string>(EVENTS.cpuUsage)
      .subscribe((cpuUsage) => this._cpuUsage.next(cpuUsage));
  }
}
