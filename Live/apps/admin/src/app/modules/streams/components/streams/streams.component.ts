import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DeviceEntity, StreamEntity } from "@live/entities";
import { Logger } from "@live/services";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
import { DIALOG_CONFIG_STEPPER } from "../../../../constants/mat-dialog-config-stepper";
import { DevicesService } from "../../../../services/devices/devices.service";
import { StreamService } from "../../../../services/stream/stream.service";
import { StreamCreationDialogComponent } from "../stream-creation-dialog/stream-creation-dialog.component";
import { StreamDeletionDialogComponent } from "../stream-deletion-dialog/stream-deletion-dialog.component";

@Component({
  selector: "streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"]
})
export class StreamsComponent implements OnInit {

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

  public openNewStreamDialog(): void {
    this.newStreamDialog
      .open(StreamCreationDialogComponent, DIALOG_CONFIG_STEPPER)
      .afterClosed()
      .toPromise()
      .then((stream) => {
        if (!stream) {
          return;
        }

        this._streamService
          .createStream(stream)
          .then((createdStream) => this.addStream(createdStream));
      });
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

  private addStream(stream: StreamEntity): void {
    this.streams.push(stream);
  }

  private removeStream(streamEntity: StreamEntity): void {
    const streamIndex = this.streams.indexOf(streamEntity);
    if (streamIndex > -1) {
      this.streams.splice(streamIndex, 1);
    }
  }
}
