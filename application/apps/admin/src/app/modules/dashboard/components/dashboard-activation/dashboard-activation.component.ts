import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivationStateEntity } from "@liveo/entities";
import { Logger } from "@liveo/services";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ActivationService } from "../../../../services/activation/activation.service";
import { ActivationDeletionDialogComponent } from "../activation-deletion-dialog/activation-deletion-dialog.component";

@Component({
  selector: "dashboard-activation",
  templateUrl: "./dashboard-activation.component.html",
  styleUrls: ["./dashboard-activation.component.scss"]
})
export class DashboardActivationComponent {

  @Select()
  public activationState$: Observable<ActivationStateEntity>;

  constructor(
    private readonly _logger: Logger,
    private readonly _activationService: ActivationService,
    public readonly activationDeletionDialog: MatDialog
  ) {
  }

  public openActivationDeletionDialog(): void {
    const dialogRef = this.activationDeletionDialog.open(ActivationDeletionDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().toPromise().then((result) => {
      this._logger.info(`The dialog was closed, result: ${result}`);

      if (result) {
        this._activationService.deleteActivation();
      }
    });
  }
}
