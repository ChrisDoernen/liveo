import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StreamEntity } from "@live/entities";
import { EndpointService } from "@live/services";
import { map } from "rxjs/operators";

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
      .get<StreamEntity[]>(this._endpointService.getEndpoint("streams"))
      .toPromise();
  }
}
