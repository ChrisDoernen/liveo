import { Component, OnInit } from "@angular/core";
import { StreamEntity } from "@live/entities";
import { StreamService } from "../../services/stream/stream.service";

@Component({
  selector: "streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"]
})
export class StreamsComponent implements OnInit {

  public streams: StreamEntity[];

  constructor(
    private _streamService: StreamService) {
  }

  public ngOnInit(): void {
    this._streamService.getStreams().then((streams) => {
      this.streams = streams;
    });
  }
}
