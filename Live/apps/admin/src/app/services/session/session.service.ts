import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionEntity, ActivationEntity } from "@live/entities";
import { Observable, Subject } from "rxjs";
import { ActivationService } from "../activation/activation.service";
import { EndpointService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  private _activatedSession = new Subject<SessionEntity>();

  public activatedSession = this._activatedSession.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _activationService: ActivationService) {
  }

  public subscribeToActivations(): void {
    this._activationService.activation$
      .subscribe((activation: ActivationEntity) => this.actualizeActivatedSession(activation));
  }

  private actualizeActivatedSession(activation: ActivationEntity): void {
    if (activation) {
      this.getSession(activation.sessionId).toPromise()
        .then((session) => this._activatedSession.next(session));
    } else {
      this._activatedSession.next(null);
    }
  }

  public getSession(id: string): Observable<SessionEntity> {
    return this._httpClient.get<SessionEntity>(this._endpointService.getEndpoint(`sessions/${id}`));
  }

  public getSessions(): Observable<SessionEntity[]> {
    return this._httpClient.get<SessionEntity[]>(this._endpointService.getEndpoint(`sessions`));
  }
}
