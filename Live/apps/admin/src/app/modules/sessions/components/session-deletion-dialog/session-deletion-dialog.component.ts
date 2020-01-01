import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "session-deletion-dialog",
  templateUrl: "./session-deletion-dialog.component.html",
})
export class SessionDeletionDialogComponent {

  public confirmationDialogData = {
    title: "Delete Session"
  }

  public constructor(
    public dialogRef: MatDialogRef<SessionDeletionDialogComponent>) {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
