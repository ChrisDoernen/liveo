import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { Session } from "../../entities/session.entity";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  constructor(private _httpClient: HttpClient, private _endpointService: EndpointService) { }

  public getSession(): Observable<Session> {
    return this._httpClient.get(this._endpointService.getEndpoint("sessions/active"), { observe: "response", responseType: "json" })
      .pipe(map((response: any) => {
        return (response.status == 200) ? response.body as Session : null;
      }));
  }
}
