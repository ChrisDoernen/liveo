import { Component, OnInit } from "@angular/core";
import { StreamService } from "@live/services";
import { StreamEntity } from "@live/entities";

@Component({
  selector: "streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"]
})
export class StreamsComponent implements OnInit {

  public streams: StreamEntity[];

  constructor(private _streamService: StreamService) {
  }

  ngOnInit() {
    this._streamService.getStreams().then((streams) => {
      this.streams = streams;
    });
  }
}
