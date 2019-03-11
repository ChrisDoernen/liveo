import { Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent {
  private _version: string = environment.version;
  private _revision: string = environment.revision;

  @Input()
  public hidden: boolean = true;

  public hide(): void {
    this.hidden = true;
  }
}
