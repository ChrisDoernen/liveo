import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { Session } from "../../entities/session.entity";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  constructor(private _httpClient: HttpClient, private _endpointService: EndpointService) { }

  public async getSession(id: string): Promise<Session> {
    return this._httpClient
      .get(this._endpointService.getEndpoint(`sessions/${id}`), { observe: "response", responseType: "json" })
      .pipe(map((response: any) => (response.status == 200) ? response.body as Session : null))
      .toPromise();
  }
}
