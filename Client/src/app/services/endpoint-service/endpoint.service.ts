import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class EndpointService {

  private protocol: string = environment.protocol;
  private ip: string = environment.ip;
  private port: number = environment.port;

  public getEndpoint(path: string): string {
    const url = `${this.protocol}://${this.ip}:${this.port}/client/${path}`;
    console.debug(`Returned url ${url}.`);
    return url;
  }
}
