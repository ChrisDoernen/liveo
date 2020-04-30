import { Inject, Injectable, InjectionToken } from "@angular/core";
import { ENDPOINTS } from "@liveo/constants";
import { Logger } from "../logging/logger";

export const ROUTE = new InjectionToken<string>("ROUTE");

@Injectable({
  providedIn: "root"
})
export class EndpointService {
  constructor(
    private _logger: Logger,
    @Inject(ROUTE) private _route: string
  ) {
  }

  public getEndpoint(path: string, queryParams: string[] = null): string {
    let url = `${ENDPOINTS.api}/${this._route}/${path}`;
    if (queryParams) {
      url += `?${queryParams.join("&")}`;
    }

    this._logger.info(`Returned url ${url}.`);
    return url;
  }
}
