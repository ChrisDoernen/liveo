import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { EndpointService } from "@live/services";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateService {

  private _isOnline = new ReplaySubject<boolean>();

  public isOnline$ = this._isOnline.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public checkConnectionState(): void {
    this._httpClient.get<string[]>(this._endpointService.getEndpoint(`connection`)).toPromise()
      .then(() => this._isOnline.next(true))
      .catch(() => this._isOnline.next(false));
  }
}
