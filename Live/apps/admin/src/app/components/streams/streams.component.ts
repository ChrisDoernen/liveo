import { Component, OnInit } from "@angular/core";
import { DeviceEntity, StreamEntity } from "@live/entities";
import { DevicesService } from "../../services/devices/devices.service";
import { StreamService } from "../../services/stream/stream.service";

@Component({
  selector: "streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"]
})
export class StreamsComponent implements OnInit {

  public streams: StreamEntity[];
  public devices: DeviceEntity[];

  constructor(
    private readonly _streamService: StreamService,
    private readonly _devicesService: DevicesService) {
  }

  public ngOnInit(): void {
    this._streamService.getStreams().then((streams) => this.streams = streams);
    this._devicesService.getDevices().then((devices) => this.devices = devices);
  }
}
