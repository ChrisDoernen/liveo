import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "@live/services";
import { SettingsEntity } from "@live/entities";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  private _settings = new ReplaySubject<SettingsEntity>();

  public settings$ = this._settings.asObservable();

  private set settings(settings: SettingsEntity) {
    console.debug(`Emitting settings: ${JSON.stringify(settings)}.`);
    this._settings.next(settings);
  }

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getSettings(): void {
    this._httpClient.get<SettingsEntity>(this._endpointService.getEndpoint(`settings`))
      .subscribe((settings) => this.settings = settings);
  }

  public updateSettings(settings: SettingsEntity): void {
    this._httpClient.put<SettingsEntity>(this._endpointService.getEndpoint(`settings`), settings)
      .subscribe((updatedSettings) => this.settings = updatedSettings);
  }
}
