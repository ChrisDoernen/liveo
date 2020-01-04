import { Component } from "@angular/core";
import { ActivationService } from "../../../../services/activation/activation.service";

@Component({
  selector: "activation-state-tile",
  templateUrl: "./activation-state-tile.component.html",
  styleUrls: ["./activation-state-tile.component.scss"]
})
export class ActivationStateTileComponent {

  constructor(
    public activationService: ActivationService) {
  }
}
