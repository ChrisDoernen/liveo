import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { SessionEntity } from "@live/entities";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getSession(id: string): Observable<SessionEntity> {
    return this._httpClient.get<SessionEntity>(this._endpointService.getEndpoint(`sessions/${id}`));
  }

  public getSessions(): Observable<SessionEntity[]> {
    return this._httpClient.get<SessionEntity[]>(this._endpointService.getEndpoint(`sessions`));
  }
}
