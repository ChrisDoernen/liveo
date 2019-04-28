import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { SessionEntity } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService
  ) { }

  public async getSession(id: string): Promise<SessionEntity> {
    return this._httpClient
      .get(this._endpointService.getEndpoint(`sessions/${id}`), {
        observe: "response",
        responseType: "json"
      })
      .pipe(
        map((response: any) =>
          response.status === 200 ? (response.body as SessionEntity) : null
        )
      )
      .toPromise();
  }

  public async getSessions(): Promise<SessionEntity[]> {
    return this._httpClient
      .get(this._endpointService.getEndpoint(`sessions`), {
        observe: "response",
        responseType: "json"
      })
      .pipe(
        map((response: any) =>
          response.status === 200 ? (response.body as SessionEntity[]) : null
        )
      )
      .toPromise();
  }
}
