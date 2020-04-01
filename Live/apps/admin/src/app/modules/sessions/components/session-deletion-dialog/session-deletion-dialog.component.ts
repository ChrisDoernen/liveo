import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import ConfirmationDialogData from "../../../shared/components/confirmation-dialog/confirmation-dialog.data";

@Component({
  selector: "session-deletion-dialog",
  templateUrl: "./session-deletion-dialog.component.html",
})
export class SessionDeletionDialogComponent {

  public confirmationDialogData: ConfirmationDialogData = {
    title: "Delete Session"
  }

  public constructor(
    public dialogRef: MatDialogRef<SessionDeletionDialogComponent>) {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
