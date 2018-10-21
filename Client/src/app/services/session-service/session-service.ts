import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointService } from '../endpoint-service/endpoint.service';
import { Session } from '../../entities/session.entity';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient: HttpClient, 
    private endpointService: EndpointService) { }

  public getSession(): Observable<Session> {
     return this.httpClient.get(this.endpointService.getApiEndpoint("session"))
      .pipe(map((response: any) => {
        debugger;
        console.debug("Retrieved session " + response.id);
          return Session.deserialize(response);
      }))
  }
}
