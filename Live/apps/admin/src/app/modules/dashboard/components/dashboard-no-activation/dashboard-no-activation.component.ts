import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DIALOG_CONFIG_STEPPER } from "../../../../constants/mat-dialog-config-stepper";
import { ActivationService } from "../../../../services/activation/activation.service";
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
    this.activationDialog
      .open(ActivationDialogComponent, DIALOG_CONFIG_STEPPER)
      .afterClosed()
      .toPromise()
      .then((activation) => {
        if (!activation) {
          return;
        }

        this.activationService.setActivation(activation);
      });
  }
}
