import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../src/environments/environment";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
  public version: string = environment.version;
  public revision: string = environment.revision;

  @ViewChild("sidenav", {static: true}) sidenav: ElementRef;

  constructor(
    public route: ActivatedRoute,
    public router: Router) {
  }

  public navigate(route: string): void {
    this.router.navigate([`home/${route}`]);
  }
}
