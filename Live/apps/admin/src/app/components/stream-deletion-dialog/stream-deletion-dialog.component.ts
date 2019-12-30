import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "stream-deletion-dialog",
  templateUrl: "./stream-deletion-dialog.component.html",
})
export class StreamDeletionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StreamDeletionDialogComponent>) {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
