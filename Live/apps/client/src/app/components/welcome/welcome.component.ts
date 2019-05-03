import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivityService, L3asService } from "@live/services";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activityService: ActivityService,
    private _l3asService: L3asService) {
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(["/home"]);
    }, 2200);
  }
}
