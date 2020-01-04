import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceEntity } from "@live/entities";
import { EndpointService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class DevicesService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getDevices(): Promise<DeviceEntity[]> {
    return this._httpClient
      .get<DeviceEntity[]>(this._endpointService.getEndpoint("devices"))
      .toPromise();
  }
}
