import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { ActivityEntity } from "@live/entities";

/**
 * Service that gets activity and stores it in an internal cache.
 * Activity is loaded on construction direcly a app startup.
 */
@Injectable({
  providedIn: "root"
})
export class ActivityCacheService {
  public activity: ActivityEntity;
  public connectionError: boolean;

  constructor(private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public refresh(): void {
    this.getActivity();
  }

  public getActivity(): void {
    this._httpClient
      .get<ActivityEntity>(this._endpointService.getEndpoint("activity"))
      .subscribe((activity) => this.activity = activity, (error) => this.connectionError = true);
  }
}
