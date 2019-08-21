import { Injectable } from "@angular/core";
import { ENDPOINTS } from "@live/constants";

@Injectable()
export class EndpointService {
  constructor(
    private _route: string) {
  }

  public getEndpoint(path: string): string {
    const url = `${ENDPOINTS.api}/${this._route}/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }
}
