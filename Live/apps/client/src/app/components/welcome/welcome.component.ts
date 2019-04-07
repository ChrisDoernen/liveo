import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService, L3asService } from "@live/services";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _l3asService: L3asService
  ) { }

  public ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(["/home"]);
    }, 2200);
  }
}
