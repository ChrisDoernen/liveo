import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingsEntity } from "@liveo/entities";
import { EndpointService, Logger } from "@liveo/services";

@Injectable()
export class SettingsClient {

private readonly _settingsRoute = "settings";

  constructor(
    private readonly _logger: Logger,
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService
  ) {
  }

  public getSettings(): Promise<SettingsEntity> {
    return this._httpClient
      .get<SettingsEntity>(this._endpointService.getEndpoint(this._settingsRoute))
      .toPromise();
  }

  public updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    return this._httpClient
      .put<SettingsEntity>(this._endpointService.getEndpoint(this._settingsRoute), settings)
      .toPromise();
  }
}
