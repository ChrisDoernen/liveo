import { Component, Input } from "@angular/core";
import { Stream } from "../../entities/stream.entity";

@Component({
  selector: "stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.css"]
})
export class StreamComponent {

  @Input()
  public stream: Stream;

}
