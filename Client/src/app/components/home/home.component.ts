import { Component, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { ActivationState } from "../../entities/activation-state";
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
  public activationState: ActivationState = null;
  public isLoading: boolean = true;
  public connectionError: boolean = false;
  public ActivationState: any = ActivationState;

  constructor(private _activationService: ActivationService,
    private _sessionService: SessionService) {
  }

  public ngOnInit(): void {
    this.load().then(() => {
      this.isLoading = false;
      console.log("Loading done.");
    }).catch((error) => {
      console.log(`Loading error: ${JSON.stringify(error)}.`);
      this.isLoading = false;
    });
  }

  public async load(): Promise<void> {
    this.isLoading = true;

    return new Promise<void>((resolve) => {
      this.loadActivation().then(() => {
        resolve();
      });
    });

    // this.determineActivationState();
  }

  private async loadActivation(): Promise<void> {
    return new Promise<void>((resolve) => {
      this._activationService.getActivation().then((activation) => {
        this.activation = activation;
        if (activation) {
          this.loadSession(activation.sessionId);
        }
        resolve();
      }).catch((error) => {
        console.debug(`Error loading activation: ${JSON.stringify(error)}.`);
        resolve();
      });
    });
  }

  private async loadSession(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this._sessionService.getSession(id).then((session) => {
        this.session = session;
        resolve();
      }).catch((error) => {
        console.debug(`Error loading session: ${JSON.stringify(error)}.`);
        resolve();
      });
    });
  }
}
