import { Component, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { SessionService } from "../../services/session-service/session-service";

@Component({
  selector: "session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.css"]
})

export class SessionComponent implements OnInit {

  public session: Session;
  public isLoading: boolean = true;
  public noSessionActive: boolean = false;
  public connectionError: boolean = false;

  constructor(private sessionService: SessionService) {
  }

  public ngOnInit(): void {
    this.getSession();
  }

  private getSession(): void {
    this.sessionService.getSession().subscribe((session) => {
      if (session != null) {
        this.session = session;
      } else {
        this.noSessionActive = true;
      }
      this.isLoading = false;
    }, (error) => {
      this.connectionError = true;
      this.isLoading = false;
    });
  }
}
