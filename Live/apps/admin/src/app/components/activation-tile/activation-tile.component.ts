import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivationDialogComponent } from "../activation-dialog/activation-dialog.component";

@Component({
  selector: "activation-tile",
  templateUrl: "./activation-tile.component.html",
  styleUrls: ["./activation-tile.component.scss"]
})
export class ActivationTileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivationDialogComponent, { width: "300px", restoreFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The activation dialog was closed, result: ${result}`);

      if (result) {
      }
    });
  }
}
