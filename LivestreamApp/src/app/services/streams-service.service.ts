import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {

  private apiUrl: string = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  public getAvailableLiveStreams(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/streams/getstartedstreams');
  }
}
