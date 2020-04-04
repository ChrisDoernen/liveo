import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingsEntity } from "@liveo/entities";
import { EndpointService, Logger } from "@liveo/services";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  constructor(
    private _logger: Logger,
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getSettings(): Promise<SettingsEntity> {
    return this._httpClient
      .get<SettingsEntity>(this._endpointService.getEndpoint(`settings`))
      .toPromise();
  }

  public updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    return this._httpClient
      .put<SettingsEntity>(this._endpointService.getEndpoint(`settings`), settings)
      .toPromise();
  }
}
