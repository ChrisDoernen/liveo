import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivationEntity, SessionEntity } from "@live/entities";
import { EndpointService } from "@live/services";
import { Observable, Subject } from "rxjs";
import { ActivationService } from "../activation/activation.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  private _activatedSession = new Subject<SessionEntity>();

  public activatedSession$ = this._activatedSession.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _activationService: ActivationService) {
  }

  public subscribeToActivations(): void {
    this._activationService.activation$.subscribe((activation) => this.actualizeActivatedSession(activation));
  }

  private actualizeActivatedSession(activation: ActivationEntity): void {
    if (activation) {
      this.getSession(activation.sessionId)
        .subscribe((session) => this._activatedSession.next(session));
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

  public deleteSession(session: SessionEntity): Promise<void> {
    return this._httpClient
      .delete<void>(this._endpointService.getEndpoint(`sessions/${session.id}`))
      .toPromise();
  }
}
