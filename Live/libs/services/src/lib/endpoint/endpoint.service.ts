import { Injectable } from "@angular/core";
import { ENDPOINTS } from "@live/constants";

@Injectable({
  providedIn: "root"
})
export class EndpointService {
  public getEndpoint(path: string): string {
    const url = `${ENDPOINTS.api}/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }
}
