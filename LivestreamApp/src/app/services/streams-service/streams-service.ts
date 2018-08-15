import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveStream } from '../../entities/live-stream.entity';
import { map } from 'rxjs/operators';
import { EndpointService } from '../endpoint-service/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {

  constructor(private httpClient: HttpClient, 
    private endpointService: EndpointService) { }

  public getAvailableLiveStreams(): Observable<LiveStream[]> {
     return this.httpClient.get(this.endpointService.getEndpoint("streams"))
     .pipe(map((response: string) => {
       return JSON.parse(response).map((item) => {
         return LiveStream.deserialize(item);
       })
     }))
  }

  public getLiveStream(id: string): Observable<LiveStream> {
     return this.httpClient.get(this.endpointService.getEndpoint("streams/" + id))
     .pipe(map((response: string) => {
         return LiveStream.deserialize(JSON.parse(response));
     }))
  }
}
