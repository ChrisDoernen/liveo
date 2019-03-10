import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Stream } from "../../entities/stream.entity";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.css"]
})
export class AudioPlayerComponent {

  @Input()
  public selectedStream: Stream = null;


}
