import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params, Router } from "@angular/router";
import { EndpointService, Logger } from "@liveo/services";
import { WebsocketService } from "../websocket/websocket.service";

export type ConnectionStateCheckContext = "Shutdown" | "Navigation";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateService {

  private _currentConnectionState: Promise<boolean>;

  constructor(
    private _logger: Logger,
    private _router: Router,
    private _websocketService: WebsocketService,
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public checkConnectionState(): Promise<boolean> {
    this._currentConnectionState =
      this._httpClient
        .get(this._endpointService.getEndpoint(`connection`), { responseType: "text" })
        .toPromise()
        .then(() => true);

    return this._currentConnectionState;
  }

  public checkOfflineAndNavigate(context?: ConnectionStateCheckContext): void {
    let params: Params;
    if (context === "Shutdown") {
      params = { "shutdown": true };
    }

    this.checkConnectionState()
      .catch(() => this.navigateToOfflinePage(params));
  }

  public async checkOfflineWhenNavigating(): Promise<boolean> {
    return this._currentConnectionState
      .catch(() => {
        this.navigateToOfflinePage();
        return false;
      });
  }

  public async checkOnlineAndNavigate(): Promise<void> {
    await this.checkConnectionState()
      .then(() => this.navigateToUrlOrHome())
      .catch(() => {
        // Still offline, nothing to do
      });
  }

  private navigateToUrlOrHome(url?: string): void {
    this._websocketService.reconnect();
    if (url) {
      this._router.navigate([url]);
    } else {
      this._router.navigate(["/home"]);
    }
  }

  private navigateToOfflinePage(params?: Params): void {
    this._logger.info("Navigating to offline page.");
    this._router.navigate(["/offline"], { queryParams: params });
  }
}
