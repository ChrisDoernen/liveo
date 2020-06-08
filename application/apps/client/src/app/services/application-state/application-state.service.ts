import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivationStateEntity } from "@liveo/entities";
import { EndpointService } from "@liveo/services";
import { delay } from "rxjs/operators";

/**
 * Service that holds the application state.
 */
@Injectable({
  providedIn: "root"
})
export class ApplicationStateService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService
  ) {
  }

  public loadApplicationState(): Promise<ActivationStateEntity> {
    return this._httpClient
      .get<ActivationStateEntity>(this._endpointService.getEndpoint("application-state"))
      .pipe(delay(1000))
      .toPromise();
  }
}
