import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndpointService } from "@liveo/services";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService
  ) {
  }

  public initialize(): void {
    this._httpClient
      .get(this._endpointService.getEndpoint("theme/color"), { responseType: "text" })
      .toPromise()
      .then((color) => {
        document.documentElement.style.setProperty("--primary-color", color);
      })
      .catch((error) => {
        console.error("Could not set color because: ", error);
      });
  }
}
