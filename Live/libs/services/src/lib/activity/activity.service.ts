import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { ActivityEntity } from "@live/entities";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActivityService {
  public activity: ActivityEntity;
  public connectionError: boolean;

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
    this.loadActivity();
  }

  public loadActivity(): void {
    this.getActivity()
      .subscribe((activity) => this.activity = activity, () => this.connectionError = true);
  }

  private getActivity(): Observable<ActivityEntity> {
    return this._httpClient.get<ActivityEntity>(this._endpointService.getEndpoint("activity"));
  }
}
