import { Injectable, Inject, InjectionToken } from "@angular/core";
import { ENDPOINTS } from "@live/constants";
import { Logger } from "../logging/logger";

export const ROUTE = new InjectionToken<string>("ROUTE");

@Injectable({
  providedIn: "root"
})
export class EndpointService {
  constructor(
    private _logger: Logger,
    @Inject(ROUTE) private _route: string) {
  }

  public getEndpoint(path: string): string {
    const url = `${ENDPOINTS.api}/${this._route}/${path}`;
    this._logger.info(`Returned url ${url}.`);
    return url;
  }
}
