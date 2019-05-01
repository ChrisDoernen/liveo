import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";
import { ActivationEntity, SessionEntity } from "@live/entities";
import { ActivationService, SessionService } from "@live/services";

@Component({
  selector: "activation-tile",
  templateUrl: "./activation-tile.component.html",
  styleUrls: ["./activation-tile.component.scss"]
})
export class ActivationTileComponent implements OnInit {

  private _activation: ActivationEntity;
  public session: SessionEntity;

  public get activation(): ActivationEntity {
    return this._activation;
  }

  public set activation(activation: ActivationEntity) {
    this._activation = activation;

    if (activation) {
      this._sessionService.getSession(activation.sessionId)
        .subscribe((session) => this.session = session);
    }
  }

  constructor(private _activationService: ActivationService,
    private _sessionService: SessionService,
    public dialog: MatDialog) {
  }

  public ngOnInit() {
    this._activationService.getActivation()
      .subscribe((activation) => this.activation = activation);
  }

  public openActivationDialog(): void {
    const dialogRef = this.dialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });
    dialogRef.afterClosed().subscribe(this.setActivation.bind(this));
  }

  public deleteActivation(): void {
    this._activationService.deleteActivation()
      .subscribe((activation) => this.activation = activation);
  }

  private setActivation(newActivation: ActivationEntity): void {
    if (!newActivation) {
      return;
    }

    console.log(`Setting new activation: ${newActivation}.`);
    this._activationService.setActivation(newActivation)
      .subscribe((activation) => this.activation = activation);
  }
}
