import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routeAnimation } from "./animations/router-animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [routeAnimation]
})
export class AppComponent {

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
  }
}
