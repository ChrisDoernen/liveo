import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _router: Router) {
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(["/home"]);
    }, 2000);
  }
}
