import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationStateEntity } from "@live/entities";
import { EndpointService } from "@live/services";
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
    private readonly _endpointService: EndpointService) {
  }

  public loadApplicationState(): Promise<ApplicationStateEntity> {
    return this._httpClient
      .get<ApplicationStateEntity>(this._endpointService.getEndpoint("application-state"))
      .pipe(delay(1000))
      .toPromise();
  }
}
