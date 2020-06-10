import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HslColor } from "@liveo/entities";
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
      .get<HslColor>(this._endpointService.getEndpoint("theme/color"))
      .toPromise()
      .then((color) => {
        document.documentElement.style.setProperty("--primary-color-h", color.h.toString());
        document.documentElement.style.setProperty("--primary-color-s", color.s.toString() + "%");
        document.documentElement.style.setProperty("--primary-color-l", color.l.toString() + "%");
      })
      .catch((error) => {
        console.error("Could not set color because: ", error);
      });
  }
}
