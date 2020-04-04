import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivationEntity, SessionEntity } from "@liveo/entities";
import { EndpointService, Logger } from "@liveo/services";
import { Observable, ReplaySubject } from "rxjs";
import { ActivationService } from "../activation/activation.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  private _activatedSession = new ReplaySubject<SessionEntity>();

  public activatedSession$ = this._activatedSession.asObservable();

  constructor(
    private readonly _logger: Logger,
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService,
    private readonly _activationService: ActivationService) {
  }

  public subscribeToActivations(): void {
    this._activationService.activation$.subscribe((activation) => this.actualizeActivatedSession(activation));
  }

  private actualizeActivatedSession(activation: ActivationEntity): void {
    if (activation) {
      this.getSession(activation.sessionId)
        .subscribe((session) => {
          this._activatedSession.next(session);
          this._logger.info(`Emitting new session ${JSON.stringify(session)}`);
        });
    } else {
      this._activatedSession.next(null);
    }
  }

  public getSession(id: string): Observable<SessionEntity> {
    return this._httpClient
      .get<SessionEntity>(this._endpointService.getEndpoint(`sessions/${id}`));
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
