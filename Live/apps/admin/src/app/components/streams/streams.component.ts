import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DeviceEntity, StreamEntity } from "@live/entities";
import { DevicesService } from "../../services/devices/devices.service";
import { StreamService } from "../../services/stream/stream.service";
import { NewStreamDialogComponent } from "../new-stream-dialog/new-stream-dialog.component";

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
    private readonly _devicesService: DevicesService,
    public readonly newStreamDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this._devicesService.getDevices().then((devices) => this.devices = devices);
    this._streamService.getStreams().then((streams) => this.streams = streams);
  }

  public isDeviceAvailable(deviceId: string): boolean {
    return this.devices && !!this.devices.find((device) => device.id === deviceId);
  }

  public openNewStreamDialog(): void {
    const dialogRef = this.newStreamDialog.open(NewStreamDialogComponent, { width: "500px", restoreFocus: false });
    dialogRef.afterClosed().toPromise().then((stream) => {
      if (!stream) {
        return;
      }

      // this.activationService.setActivation(stream);
    });
  }
}
