import { Component, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { SessionState } from "../../entities/session-state";
import { SessionService } from "../../services/session/session.service";
import { ActivationService } from "src/app/services/activation/activation.service";
import { Activation } from "src/app/entities/activation.entity";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {

  public session: Session = null;
  public activation: Activation = null;
  public sessionState: SessionState = null;
  public isLoading: boolean = true;
  public connectionError: boolean = false;
  public SessionState: any = SessionState;

  constructor(private _activationService: ActivationService,
    private _sessionService: SessionService) {
  }

  public ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.isLoading = true;

    this._activationService.getActivation().then((activation) => {
      if (activation) {
        this.activation = activation;
        this._sessionService.getSession().then((session) => {
          this.session = session;
          this.sessionState = this.session ? this._sessionService.evaluateSessionState(this.session) : null;
        }).catch((error) => {
          this.isLoading = false;
          this.connectionError = true;
          console.debug(`Connection error: ${error.toString()}.`);
        });
      }
      this.isLoading = false;
      this.connectionError = false;
    }).catch((error) => {
      console.debug(`Connection error: ${error.toString()}.`);
    });
  }
}
