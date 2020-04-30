import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionEntity } from "@liveo/entities";
import { EndpointService } from "@liveo/services";

@Injectable({
  providedIn: "root"
})
export class SessionClient {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService
  ) {
  }

  public getSession(id: string): Promise<SessionEntity> {
    return this._httpClient
      .get<SessionEntity>(this._endpointService.getEndpoint(`sessions/${id}`))
      .toPromise();
  }

  public getSessions(): Promise<SessionEntity[]> {
    return this._httpClient
      .get<SessionEntity[]>(this._endpointService.getEndpoint(`sessions`))
      .toPromise();
  }

  public createSession(streamEntity: SessionEntity): Promise<SessionEntity> {
    return this._httpClient
      .post<SessionEntity>(this._endpointService.getEndpoint("sessions"), streamEntity)
      .toPromise();
  }

  public deleteSession(session: SessionEntity): Promise<void> {
    return this._httpClient
      .delete<void>(this._endpointService.getEndpoint(`sessions/${session.id}`))
      .toPromise();
  }
}
