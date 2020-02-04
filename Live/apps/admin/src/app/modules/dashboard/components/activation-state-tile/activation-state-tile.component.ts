import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ActivationEntity, ActivationState } from "@live/entities";

@Component({
  selector: "activation-state-tile",
  templateUrl: "./activation-state-tile.component.html",
  styleUrls: ["./activation-state-tile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivationStateTileComponent {

  @Input()
  public activationState: ActivationState;

  @Input()
  public activation: ActivationEntity;
}
