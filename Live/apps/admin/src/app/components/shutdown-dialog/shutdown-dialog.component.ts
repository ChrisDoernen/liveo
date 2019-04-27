import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "shutdown-dialog",
  templateUrl: "./shutdown-dialog.component.html",
})
export class ShutdownDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShutdownDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
