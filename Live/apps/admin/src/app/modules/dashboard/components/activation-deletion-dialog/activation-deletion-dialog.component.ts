import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "activation-deletion-dialog",
  templateUrl: "./activation-deletion-dialog.component.html",
})
export class ActivationDeletionDialogComponent {

  public confirmationDialogData = {
    title: "Deactivate Session"
  }

  public constructor(
    public dialogRef: MatDialogRef<ActivationDeletionDialogComponent>) { }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
