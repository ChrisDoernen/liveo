import { Component, Output, EventEmitter, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { ActivationStateService } from "../../services/activation-state/activation-state.service";
import { Subscription } from "rxjs";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding("class.streaming-background")
  public activationExisting = false;

  @Output()
  public menuIconClicked: EventEmitter<void> = new EventEmitter();

  private _activationSubscription: Subscription;

  constructor(
    private readonly _activationStateService: ActivationStateService) {
  }

  ngOnInit(): void {
    this._activationSubscription = this._activationStateService.activation$
      .subscribe((activation) => this.activationExisting = !!activation)
  }

  public onMenuIconClick(): void {
    this.menuIconClicked.emit();
  }

  ngOnDestroy() {
    this._activationSubscription.unsubscribe();
  }
}
