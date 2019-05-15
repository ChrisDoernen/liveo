import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { EndpointService } from "@live/services";
import { ActivityEntity } from "../../entities/activity.entity";

/**
 * Service that gets activity and stores it in an internal cache.
 * Activity is loaded on construction direcly a app startup.
 */
@Injectable({
  providedIn: "root"
})
export class ActivityService {
  private _cache: Observable<ActivityEntity>;

  constructor(private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getActivity(): Promise<ActivityEntity> {
    return this._cache.toPromise();
  }

  public reloadActivity(): void {
    this.getActivity();
  }

  public loadActivity(): void {
    this._cache = this._httpClient
      .get<ActivityEntity>(this._endpointService.getEndpoint("activity"))
      .pipe(shareReplay(1));
  }
}
