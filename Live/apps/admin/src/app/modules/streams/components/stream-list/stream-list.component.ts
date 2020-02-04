import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
  styleUrls: ["./stream-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamListComponent implements OnInit {

  public loading: boolean;
  public error: Error;
  public streams: StreamEntity[] = [];
  public devices: DeviceEntity[] = [];
  public displayedColumns: string[] = ["title", "deviceId", "valid", "delete"];

  constructor(
    private readonly _logger: Logger,
    private readonly _streamService: StreamService,
    private readonly _devicesService: DevicesService,
    public readonly newStreamDialog: MatDialog,
    public readonly streamDeletionDialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.loading = true;
    Promise.all([this._devicesService.getDevices(), this._streamService.getStreams()])
      .then(([devices, streams]) => {
        this.devices = devices;
        this.streams = streams;
        this.loading = false;
        this._changeDetectorRef.detectChanges();
      }).catch((error) => {
        this.error = error;
        this.loading = false;
        this._changeDetectorRef.detectChanges();
      });
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
    this.streams = [...this.streams];
    this._changeDetectorRef.detectChanges();
  }
}
