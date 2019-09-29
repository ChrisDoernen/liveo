import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { StreamEntity } from "@live/entities";
import { EndpointService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class StreamService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getStream(id: string): Promise<StreamEntity> {
    return this._httpClient
      .get(this._endpointService.getEndpoint(`streams/${id}`), {
        observe: "response",
        responseType: "json"
      })
      .pipe(
        map((response: any) =>
          response.status === 200 ? (response.body as StreamEntity) : null
        )
      )
      .toPromise();
  }

  public getStreams(): Promise<StreamEntity[]> {
    return this._httpClient
      .get(this._endpointService.getEndpoint("streams"), {
        observe: "response",
        responseType: "json"
      })
      .pipe(
        map((response: any) =>
          response.status === 200 ? (response.body as StreamEntity[]) : null
        )
      )
      .toPromise();
  }
}
