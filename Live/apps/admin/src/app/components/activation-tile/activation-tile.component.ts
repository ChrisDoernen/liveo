import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";
import { ActivationDeletionDialogComponent } from "../activation-deletion-dialog/activation-deletion-dialog.component";
import { ActivationService } from "../../services/activation/activation.service";

@Component({
  selector: "activation-tile",
  templateUrl: "./activation-tile.component.html",
  styleUrls: ["./activation-tile.component.scss"]
})
export class ActivationTileComponent {

  constructor(
    public activationService: ActivationService,
    public activationDialog: MatDialog,
    public activationDeletionDialog: MatDialog) {
  }

  public openActivationDialog(): void {
    const dialogRef = this.activationDialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });
    dialogRef.afterClosed().toPromise().then((activation) => {
      if (!activation) {
        return;
      }

      this.activationService.setActivation(activation);
    });
  }

  public openActivationDeletionDialog(): void {
    const dialogRef = this.activationDeletionDialog.open(ActivationDeletionDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().toPromise().then((result) => {
      console.log(`The dialog was closed, result: ${result}`);

      if (result) {
        this.activationService.deleteActivation();
      }
    });
  }
}
