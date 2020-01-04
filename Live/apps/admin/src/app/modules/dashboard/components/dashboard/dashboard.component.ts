import { Component } from "@angular/core";
import { ActivationService } from "../../../../services/activation/activation.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {

  constructor(
    public activationService: ActivationService) {
  }
}
