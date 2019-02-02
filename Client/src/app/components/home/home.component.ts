import { Component, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { ActivationState } from "../../entities/activation-state";
import { SessionService } from "../../services/session/session.service";
import { ActivationService } from "src/app/services/activation/activation.service";
import { Activation } from "src/app/entities/activation.entity";
import { Stream } from "src/app/entities/stream.entity";
import { StreamService } from "src/app/services/stream/stream.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {

  public session: Session = null;
  public streams: Stream[] = [];
  public activation: Activation = null;
  public activationState: ActivationState = null;
  public isLoading: boolean = true;
  public connectionError: boolean = false;
  public ActivationState: any = ActivationState;

  constructor(private _activationService: ActivationService,
    private _sessionService: SessionService,
    private _streamService: StreamService) {
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
    this.activation = null;
    this.session = null;
    this.streams = [];

    return new Promise<void>((resolve) => {
      this.loadActivation().then(() => {
        this.determineActivationState();
        resolve();
      });
    });
  }

  private determineActivationState(): void {
    if (this.activation) {
      if (this.activation.timeStarting > Date.now()) {
        this.activationState = ActivationState.ActivatedSessionScheduled;
      } else if (this.session.timeStarted < Date.now()) {
        this.activationState = ActivationState.ActivatedSessionStarted;
      } else if (this.session.timeEnded < Date.now()) {
        this.activationState = ActivationState.ActivatedSessionEnded;
      }
    } else {
      this.activationState = ActivationState.NoActivation;
    }
  }

  private async loadActivation(): Promise<void> {
    return new Promise<void>((resolve) => {
      this._activationService.getActivation().then((activation) => {
        this.activation = activation;
        if (activation) {
          console.log(`Loaded activation: ${JSON.stringify(activation)}.`);
          this.loadSession(activation.sessionId).then(resolve);
        } else {
          console.log("No activation.");
          resolve();
        }
      }).catch((error) => {
        console.debug(`Error loading activation: ${JSON.stringify(error)}.`);
        resolve();
      });
    });
  }

  private async loadSession(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this._sessionService.getSession(id).then(async (session) => {
        console.log(`Loaded session: ${JSON.stringify(session)}.`);
        this.session = session;

        for (const streamId of session.streams) {
          await this.loadStream(streamId);
        }

        resolve();
      }).catch((error) => {
        console.debug(`Error loading session: ${JSON.stringify(error)}.`);
        resolve();
      });
    });
  }

  private async loadStream(id: string): Promise<void> {
    return await new Promise<void>((resolve) => {
      this._streamService.getStream(id).then((stream) => {
        console.log(`Loaded stream: ${JSON.stringify(stream)}.`);
        this.streams.push(stream);
        resolve();
      }).catch((error) => {
        console.debug(`Error loading stream: ${JSON.stringify(error)}.`);
        resolve();
      });
    });
  }
}
