import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "shutdown-dialog",
  templateUrl: "./shutdown-dialog.component.html",
})
export class ShutdownDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShutdownDialogComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
