import { Injectable, OnInit } from "@angular/core";
import { Session } from "../../entities/session.entity";
import { ActivationState } from "../../entities/activation-state";
import { SessionService } from "../../services/session/session.service";
import { ActivationService } from "src/app/services/activation/activation.service";
import { Activation } from "src/app/entities/activation.entity";
import { Stream } from "src/app/entities/stream.entity";
import { StreamService } from "src/app/services/stream/stream.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

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
    this.loadData();
  }

  public loadData(): void {
    this.load().then(() => {
      console.log("Loading done.");
    }).catch((error) => {
      console.log(`Loading error: ${JSON.stringify(error)}.`);
    });
  }

  private async load(): Promise<void> {
    this.isLoading = true;
    this.activation = null;
    this.session = null;
    this.streams = [];

    return new Promise<void>((resolve) => {
      this.loadActivation().then(() => {
        this.determineActivationState();
        this.isLoading = false;
        resolve();
      });
    });
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
        this.connectionError = true;
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
        if (stream.isStarted) {
          console.log(`Loaded stream: ${JSON.stringify(stream)}.`);
          this.streams.push(stream);
        } else {
          console.log(`Stream ${id} is not started and will not be loaded.`);
        }
        resolve();
      }).catch((error) => {
        console.debug(`Error loading stream: ${JSON.stringify(error)}.`);
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
}
