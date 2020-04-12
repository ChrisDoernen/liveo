import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { environment } from "../../../../src/environments/environment";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent {
  public version: string = environment.version;
  public revision: string = environment.revision;

  private _isHidden = true;

  @Input()
  @HostBinding("class.hidden")
  public set isHidden(value: boolean) {
    this._isHidden = value;
    this.isHiddenChange.emit(value);
  }

  public get isHidden(): boolean {
    return this._isHidden;
  }

  @Output()
  public isHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hide(): void {
    this.isHidden = true;
  }
}
