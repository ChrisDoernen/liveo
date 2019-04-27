import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ShutdownDialogComponent } from "../shutdown-dialog/shutdown-dialog.component";
import { ShutdownService } from "@live/services";
import { Shutdown } from "@live/entities";

@Component({
  selector: "shutdown-button",
  templateUrl: "./shutdown.component.html",
  styleUrls: ["./shutdown.component.scss"]
})
export class ShutdownComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private _shutdownService: ShutdownService) {
  }

  ngOnInit() {
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
