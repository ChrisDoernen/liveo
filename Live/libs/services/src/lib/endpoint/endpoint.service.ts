import { Injectable, Inject, InjectionToken } from "@angular/core";
import { ENDPOINTS } from "@live/constants";

export const ROUTE = new InjectionToken<string>("ROUTE");

@Injectable({
  providedIn: "root"
})
export class EndpointService {
  constructor(
    @Inject(ROUTE) private _route: string) {
  }

  public getEndpoint(path: string): string {
    const url = `${ENDPOINTS.api}/${this._route}/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }
}
