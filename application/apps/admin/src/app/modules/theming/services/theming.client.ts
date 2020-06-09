import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ThemeEntity } from "@liveo/entities";
import { EndpointService, Logger } from "@liveo/services";

@Injectable()
export class ThemingClient {

  private readonly _themeRoute = "theme";

  constructor(
    private readonly _logger: Logger,
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService
  ) {
  }

  public getTheme(): Promise<ThemeEntity> {
    return this._httpClient
      .get<ThemeEntity>(this._endpointService.getEndpoint(this._themeRoute))
      .toPromise();
  }

  public updateSettings(theme: ThemeEntity): Promise<ThemeEntity> {
    return this._httpClient
      .put<ThemeEntity>(this._endpointService.getEndpoint(this._themeRoute), theme)
      .toPromise();
  }
}
