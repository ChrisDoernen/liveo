import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DeviceEntity, StreamEntity } from "@live/entities";
import { Logger } from "@live/services";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
import { DevicesService } from "../../../shared/services/devices/devices.service";
import { StreamService } from "../../../shared/services/stream/stream.service";
import { StreamDeletionDialogComponent } from "../stream-deletion-dialog/stream-deletion-dialog.component";

@Component({
  selector: "stream-list",
  templateUrl: "./stream-list.component.html",
  styleUrls: ["./stream-list.component.scss"]
})
export class StreamListComponent implements OnInit {

  public streams: StreamEntity[] = [];
  public devices: DeviceEntity[] = [];

  constructor(
    private readonly _logger: Logger,
    private readonly _streamService: StreamService,
    private readonly _devicesService: DevicesService,
    public readonly newStreamDialog: MatDialog,
    public readonly streamDeletionDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this._devicesService
      .getDevices()
      .then((devices) => this.devices = devices);
    this._streamService.
      getStreams()
      .then((streams) => this.streams = streams);
  }

  public isDeviceAvailable(deviceId: string): boolean {
    return this.devices && !!this.devices.find((device) => device.id === deviceId);
  }

  public openStreamDeletionDialog(stream: StreamEntity): void {
    this.streamDeletionDialog
      .open(StreamDeletionDialogComponent, DIALOG_CONFIG_SMALL)
      .afterClosed()
      .toPromise()
      .then((result) => {
        if (result) {
          this._streamService
            .deleteStream(stream)
            .then(() => this.removeStream(stream));
        }
      });
  }

  private removeStream(streamEntity: StreamEntity): void {
    const streamIndex = this.streams.indexOf(streamEntity);
    if (streamIndex > -1) {
      this.streams.splice(streamIndex, 1);
    }
  }
}
