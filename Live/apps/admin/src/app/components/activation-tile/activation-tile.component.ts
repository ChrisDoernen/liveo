import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";
import { ActivationEntity, SessionEntity } from "@live/entities";
import { ActivationService, SessionService } from "@live/services";
import { ActivationDeletionDialogComponent } from "../activation-deletion-dialog/activation-deletion-dialog.component";
import { ActivationStateService } from "../../services/activation-state/activation-state.service";

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
    private readonly _activationStateService: ActivationStateService,
    private _sessionService: SessionService,
    public activationDialog: MatDialog,
    public activationDeletionDialog: MatDialog) {
  }

  public ngOnInit() {
    this._activationService.getActivation()
      .subscribe((activation) => this._activationStateService.activation = activation);

    this._activationStateService.activation$
      .subscribe((activation) => this.activation = activation);
  }

  public openActivationDialog(): void {
    const dialogRef = this.activationDialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });
    dialogRef.afterClosed().subscribe(this.setActivation.bind(this));
  }

  public openActivationDeletionDialog(): void {
    const dialogRef = this.activationDeletionDialog.open(ActivationDeletionDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed, result: ${result}`);

      if (result) {
        this.deleteActivation();
      }
    });
  }

  public deleteActivation(): void {
    this._activationService.deleteActivation()
      .subscribe((activation) => this._activationStateService.activation = activation);
  }

  private setActivation(newActivation: ActivationEntity): void {
    if (!newActivation) {
      return;
    }

    console.log(`Setting new activation: ${JSON.stringify(newActivation)}.`);
    this._activationService.setActivation(newActivation)
      .subscribe((activation) => this._activationStateService.activation = activation);
  }
}
