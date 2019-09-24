import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ShutdownDialogComponent } from "../shutdown-dialog/shutdown-dialog.component";
import { Shutdown } from "@live/entities";
import { ShutdownService } from "../../services/shutdown/shutdown.service";

@Component({
  selector: "shutdown-button",
  templateUrl: "./shutdown.component.html",
  styleUrls: ["./shutdown.component.scss"]
})
export class ShutdownComponent {

  constructor(public dialog: MatDialog,
    private _shutdownService: ShutdownService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShutdownDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed, result: ${result}`);

      if (result) {
        const shutdown = new Shutdown(null);

        this._shutdownService.setShutdown(shutdown);
      }
    });
  }
}
