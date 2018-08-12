import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveStream } from '../entities/live-stream.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {

  private apiUrl: string = "http://localhost:8080/api/streams"

  constructor(private httpClient: HttpClient) { }

  public getAvailableLiveStreams(): Observable<LiveStream[]> {
    const uri = this.apiUrl;
     return this.httpClient.get(uri)
     .pipe(map((response: string) => {
       return JSON.parse(response).map((item) => {
         return LiveStream.deserialize(item);
       })
     }))
  }

  public getLiveStream(id: string): Observable<LiveStream> {
    const uri = this.apiUrl + "/" + id;
     return this.httpClient.get(uri)
     .pipe(map((response: string) => {
         return LiveStream.deserialize(JSON.parse(response));
     }))
  }
}
