import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "stream-deletion-dialog",
  templateUrl: "./stream-deletion-dialog.component.html",
})
export class StreamDeletionDialogComponent {

  public confirmationDialogData = {
    title: "Delete Stream"
  }

  public constructor(
    public dialogRef: MatDialogRef<StreamDeletionDialogComponent>) {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
