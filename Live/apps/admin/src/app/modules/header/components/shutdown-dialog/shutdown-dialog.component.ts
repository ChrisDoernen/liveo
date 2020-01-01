import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "shutdown-dialog",
  templateUrl: "./shutdown-dialog.component.html",
})
export class ShutdownDialogComponent {

  public confirmationDialogData = {
    title: "Shutdown"
  }

  public constructor(
    public dialogRef: MatDialogRef<ShutdownDialogComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
