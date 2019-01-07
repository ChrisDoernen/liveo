import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { Session } from "../../entities/session.entity";
import { SessionState } from "src/app/entities/session-state";

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

  public evaluateSessionState(session: Session): SessionState {
    let sessionState: SessionState;
    const now = Date.now();

    if (!session.timeStarted && !session.timeEnded && session.timeStarting > now) {
      sessionState = SessionState.Scheduled;
    } else if (session.timeStarted < now && !session.timeEnded && !session.timeStarting && !session.timeEnding) {
      sessionState = SessionState.Started;
    } else if (session.timeStarted < now && session.timeEnded < now) {
      sessionState = SessionState.Ended;
    } else {
      throw new Error(`Can not evaluate session state from session ${JSON.stringify(session)}.`);
    }

    return sessionState;
  }
}
