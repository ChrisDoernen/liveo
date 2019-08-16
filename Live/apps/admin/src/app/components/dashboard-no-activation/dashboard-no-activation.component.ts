import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationService } from "../../services/activation/activation.service";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";

@Component({
  selector: "dashboard-no-activation",
  templateUrl: "./dashboard-no-activation.component.html",
  styleUrls: ["./dashboard-no-activation.component.scss"]
})
export class DashboardNoActivationComponent {

  constructor(
    public activationService: ActivationService,
    public activationDialog: MatDialog) {
  }

  public openActivationDialog(): void {
    const dialogRef = this.activationDialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });
    dialogRef.afterClosed().toPromise().then((activation) => {
      if (!activation) {
        return;
      }

      this.activationService.setActivation(activation);
    });
  }
}
