import { Component, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { SessionState } from "../../entities/session-state";
import { SessionService } from "../../services/session/session.service";

@Component({
  selector: "session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.css"]
})

export class SessionComponent implements OnInit {

  public session: Session = null;
  public sessionState: SessionState = null;
  public isLoading: boolean = true;
  public connectionError: boolean = false;
  public SessionState: any = SessionState;

  constructor(private _sessionService: SessionService) {
  }

  public ngOnInit(): void {
    this.loadSession();
  }

  private loadSession(): void {
    this.isLoading = true;

    this._sessionService.getSession().subscribe((session) => {
      this.session = session;
      this.sessionState = this.session ? this.evaluateSessionState(this.session) : null;
      this.isLoading = false;
      this.connectionError = false;
    }, (error) => {
      this.isLoading = false;
      this.connectionError = true;
      console.debug(`Connection error: ${JSON.stringify(error)}.`);
    });
  }

  private evaluateSessionState(session: Session): SessionState {
    let sessionState: SessionState;
    const now = Date.now();

    if (session.timeStarted < now && !this.session.timeEnded && !this.session.timeStarting && !this.session.timeEnding) {
      sessionState = SessionState.Started;
    } else if (session.timeStarted < now && this.session.timeEnded < now && !this.session.timeStarting && !this.session.timeEnding) {
      sessionState = SessionState.Ended;
    } else if (!session.timeStarted && !this.session.timeEnded && session.timeStarting > now) {
      sessionState = SessionState.Scheduled;
    } else {
      throw new Error("Can not estimate session state.");
    }

    return sessionState;
  }
}
