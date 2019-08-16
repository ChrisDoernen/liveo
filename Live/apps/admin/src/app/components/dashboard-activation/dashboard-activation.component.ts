import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationService } from "../../services/activation/activation.service";
import { ActivationDeletionDialogComponent } from "../activation-deletion-dialog/activation-deletion-dialog.component";

@Component({
  selector: "dashboard-activation",
  templateUrl: "./dashboard-activation.component.html",
  styleUrls: ["./dashboard-activation.component.scss"]
})
export class DashboardActivationComponent {

  constructor(
    public activationService: ActivationService,
    public activationDeletionDialog: MatDialog) {
  }

  public openActivationDeletionDialog(): void {
    const dialogRef = this.activationDeletionDialog.open(ActivationDeletionDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().toPromise().then((result) => {
      console.log(`The dialog was closed, result: ${result}`);

      if (result) {
        this.activationService.deleteActivation();
      }
    });
  }
}
