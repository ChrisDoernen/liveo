import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration-service/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  private apiServerIp = ConfigurationService.settings.apiServer.ip;
  private apiServerPort = ConfigurationService.settings.apiServer.port;
  
  constructor() { }

  public getEndpoint(servicePart: string): string {
    const url = "http://" + this.apiServerIp + ":" + this.apiServerPort  + "/api/" + servicePart;
    console.debug("Returned url " + url);
    return url;
  }
}
