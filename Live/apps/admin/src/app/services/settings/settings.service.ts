import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "@live/services";
import { SettingsEntity } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public async getDefaultSession(): Promise<string> {
    const settings = await this._httpClient.get<SettingsEntity>(this._endpointService.getEndpoint(`settings`)).toPromise();

    return settings.defaultSession;
  }
}
