import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ActivationStateReducer } from "../../reducers/activation-state.reducer";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Output()
  public menuButtonClicked = new EventEmitter();

  @Select(ActivationStateReducer.activationExisting)
  public activation$: Observable<boolean>;
}
