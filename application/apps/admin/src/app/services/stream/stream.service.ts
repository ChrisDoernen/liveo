import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StreamEntity } from "@liveo/entities";
import { EndpointService } from "@liveo/services";

@Injectable({
  providedIn: "root"
})
export class StreamService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService) {
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

  public createStream(streamEntity: StreamEntity): Promise<StreamEntity> {
    return this._httpClient
      .post<StreamEntity>(this._endpointService.getEndpoint("streams"), streamEntity)
      .toPromise();
  }

  public deleteStream(streamEntity: StreamEntity): Promise<void> {
    return this._httpClient
      .delete<void>(this._endpointService.getEndpoint(`streams/${streamEntity.id}`))
      .toPromise();
  }
}
