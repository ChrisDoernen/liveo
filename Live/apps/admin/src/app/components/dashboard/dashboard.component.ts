import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public breakpoint: number;
  public activationTileColspan: number;
  private _windowWidthBreakpoint = 400;

  constructor() {
  }

  public ngOnInit() {
    this.calculateGridSizes(window.innerWidth);
  }

  public onResize(event) {
    this.calculateGridSizes(event.target.innerWidth);
  }

  private calculateGridSizes(windowWidth: number): void {
    if (windowWidth <= this._windowWidthBreakpoint) {
      this.breakpoint = 1;
      this.activationTileColspan = 1;
    } else {
      this.breakpoint = 4;
      this.activationTileColspan = 2;
    }
  }
}
