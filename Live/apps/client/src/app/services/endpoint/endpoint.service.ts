import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  public getEndpoint(path: string): string {
    const url = `/api/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }
}
