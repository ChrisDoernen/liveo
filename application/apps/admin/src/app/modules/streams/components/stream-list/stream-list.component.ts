import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeviceEntity, StreamEntity } from "@liveo/entities";
import { Logger } from "@liveo/services";
import { Select, Store } from "@ngxs/store";
import { DeleteStreamAction, GetStreamsAction } from "apps/admin/src/app/actions/streams.actions";
import { Observable } from "rxjs";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
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

  @Select()
  public devices$: Observable<DeviceEntity[]>;

  @Select()
  public streams$: Observable<StreamEntity[]>;
  public displayedColumns: string[] = ["title", "deviceId", "valid", "delete"];

  constructor(
    private readonly _logger: Logger,
    private readonly _store: Store,
    public readonly newStreamDialog: MatDialog,
    public readonly streamDeletionDialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this._store.dispatch(new GetStreamsAction());
  }

  public isDeviceAvailable(deviceId: string): boolean {
    return true // this.devices && !!this.devices.find((device) => device.id === deviceId);
  }

  public openStreamDeletionDialog(stream: StreamEntity): void {
    this.streamDeletionDialog
      .open(StreamDeletionDialogComponent, DIALOG_CONFIG_SMALL)
      .afterClosed()
      .toPromise()
      .then((result) => {
        if (result) {
          this._store.dispatch(new DeleteStreamAction(stream));
        }
      });
  }
}
