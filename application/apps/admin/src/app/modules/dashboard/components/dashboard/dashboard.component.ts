import { Component } from "@angular/core";
import { ActivationStateEntity } from "@liveo/entities";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {

  @Select()
  public activationState$: Observable<ActivationStateEntity>;

  public activation$ =
    this.activationState$.pipe(
      filter((activationState: ActivationStateEntity) => !!activationState),
      map((activationState: ActivationStateEntity) => activationState.state !== "NoActivation")
    );
}
