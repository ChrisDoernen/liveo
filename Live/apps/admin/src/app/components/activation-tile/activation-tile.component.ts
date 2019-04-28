import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";
import { ActivationEntity } from "@live/entities";
import { ActivationService } from "@live/services";

@Component({
  selector: "activation-tile",
  templateUrl: "./activation-tile.component.html",
  styleUrls: ["./activation-tile.component.scss"]
})
export class ActivationTileComponent implements OnInit {

  public activation: ActivationEntity;

  constructor(private _activationService: ActivationService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this._activationService.getActivation()
      .then((activation) => this.activation = activation);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });

    dialogRef.afterClosed().subscribe(activationDialogResult => {
      console.log(`The activation dialog was closed, result: ${activationDialogResult}`);

      if (activationDialogResult) {
        this._activationService.setActivation(activationDialogResult);
      }
    });
  }
}
