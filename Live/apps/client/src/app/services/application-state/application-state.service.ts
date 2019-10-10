import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { EndpointService, ActivationStateService, Logger } from "@live/services";
import { ApplicationStateEntity, ActivationState, ActivationEntity, SessionEntity, StreamEntity } from "@live/entities";

/**
 * Service that hols the application state.
 */
@Injectable({
  providedIn: "root"
})
export class ApplicationStateService {
  private _activationState = new ReplaySubject<ActivationState>();
  private _activation = new ReplaySubject<ActivationEntity>();
  private _session = new ReplaySubject<SessionEntity>();
  private _streams = new ReplaySubject<StreamEntity[]>();
  private _connectonError = new ReplaySubject<boolean>();

  public activationState$ = this._activationState.asObservable();
  public activation$ = this._activation.asObservable();
  public session$ = this._session.asObservable();
  public streams$ = this._streams.asObservable();
  public connectionError$ = this._connectonError.asObservable();

  constructor(
    private _logger: Logger,
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _activationStateService: ActivationStateService) {
  }

  public loadApplicationState(): void {
    this._httpClient
      .get<ApplicationStateEntity>(this._endpointService.getEndpoint("application-state")).toPromise()
      .then((applicationState: ApplicationStateEntity) => {
        const activationState = this._activationStateService.determineActivationState(applicationState.activation);
        this._activationState.next(activationState);
        this._logger.info(`Emitting new activation state: ${activationState}.`);
        this._activation.next(applicationState.activation);
        this._logger.info(`Emitting new activation: ${JSON.stringify(applicationState.activation)}.`);
        this._session.next(applicationState.session);
        this._logger.info(`Emitting new session: ${JSON.stringify(applicationState.session)}.`);
        this._streams.next(applicationState.streams);
        this._connectonError.next(false);
      })
      .catch((error) => {
        this._connectonError.next(true);
      });
  }
}
