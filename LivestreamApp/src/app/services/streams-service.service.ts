import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveStream } from '../entities/live-stream.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {

  private apiUrl: string = "http://localhost:8080/api";
  private getLiveStreamsEndpoint = "/streams/getstartedstreams"

  constructor(private httpClient: HttpClient) { }

  public getAvailableLiveStreams(): Observable<LiveStream[]> {
    const uri = this.apiUrl + this.getLiveStreamsEndpoint;
     return this.httpClient.get(uri)
     .pipe(map((response: string) => {
       return JSON.parse(response).map((item) => {
         return LiveStream.deserialize(item);
       })
     }))
  }
}
