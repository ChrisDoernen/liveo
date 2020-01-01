import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
  public version: string = environment.version;
  public revision: string = environment.revision;

  constructor(
    public route: ActivatedRoute,
    public router: Router) {
  }
}
