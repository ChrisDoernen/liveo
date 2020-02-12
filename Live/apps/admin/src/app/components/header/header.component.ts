import { Component, EventEmitter, Output } from "@angular/core";
import { ActivationService } from '../../services/activation/activation.service';

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {

  @Output()
  public menuButtonClicked = new EventEmitter();

  public activation = this._activationService.activation$;

  constructor(
    private readonly _activationService: ActivationService) {
  }
}
