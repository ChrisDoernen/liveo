import { Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private protocol: string = environment.protocol;
  private _ip: string = environment.ip;
  private _port: number = environment.port;

  public getEndpoint(path: string): string {
    const url = `${this.protocol}://${this._ip}:${this._port}/api/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }

  public get ip(): string {
    return this._ip;
  }

  public get port(): number {
    return this._port;
  }
}
