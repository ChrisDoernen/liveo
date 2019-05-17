import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "activation-deletion-dialog",
  templateUrl: "./activation-deletion-dialog.component.html",
})
export class ActivationDeletionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ActivationDeletionDialogComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
