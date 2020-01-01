import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {

  @Output()
  public menuButtonClicked = new EventEmitter();
}
