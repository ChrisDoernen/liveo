import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import ConfirmationDialogData from "./confirmation-dialog.data";

@Component({
  selector: "confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
})
export class ConfirmationDialogComponent {

  @Input()
  public data: ConfirmationDialogData;

  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
