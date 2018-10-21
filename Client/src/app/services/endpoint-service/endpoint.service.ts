import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EndpointService {

  private protocol = environment.protocol;
  private ip = environment.ip;
  private apiPort = environment.apiPort;
  
  constructor() { }

  public getApiEndpoint(path: string): string {
    const url = this.protocol + "://" + this.ip + ":" + this.apiPort  + "/api/" + path;
    console.debug("Returned url " + url);
    return url;
  }
}
