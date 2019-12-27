import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
      .get<StreamEntity>(this._endpointService.getEndpoint(`streams/${id}`))
      .toPromise();
  }

  public getStreams(): Promise<StreamEntity[]> {
    return this._httpClient
      .get<StreamEntity[]>(this._endpointService.getEndpoint("streams"))
      .toPromise();
  }
}
