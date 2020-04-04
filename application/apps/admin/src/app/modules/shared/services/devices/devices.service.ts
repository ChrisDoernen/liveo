import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceEntity } from "@live/entities";
import { EndpointService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class DevicesService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService) {
  }

  public getDevices(redetect: boolean = false): Promise<DeviceEntity[]> {
    let queryParams: string[];

    if (redetect) {
      queryParams = ["refresh=true"];
    }

    return this._httpClient
      .get<DeviceEntity[]>(this._endpointService.getEndpoint("devices", queryParams))
      .toPromise();
  }
}
