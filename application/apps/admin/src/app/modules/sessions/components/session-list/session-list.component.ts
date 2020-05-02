import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SessionEntity, StreamEntity } from "@liveo/entities";
import { Select, Store } from "@ngxs/store";
import { DeleteSessionAction } from "apps/admin/src/app/actions/sessions.actions";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
import { SessionsClient } from "../../../../services/session/session.client";
import { SessionDeletionDialogComponent } from "../session-deletion-dialog/session-deletion-dialog.component";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionListComponent {

  public loading: boolean;
  public error: Error;

  @Select()
  public sessions$: Observable<SessionEntity[]>;

  @Select()
  public streams$: Observable<StreamEntity[]>;

  public displayedColumns: string[] = ["title", "description", "streams", "delete"];

  constructor(
    private readonly _store: Store,
    private readonly _sessionService: SessionsClient,
    public readonly sessionDeletionDialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public getStreamTitles(streamIds: string[]): Observable<string> {
    return this.streams$.pipe(
      map((streams: StreamEntity[]) => {
        return streams
          .filter((stream) => streamIds.includes(stream.id))
          .map((stream) => stream.title)
          .join(", ");
      })
    )
  }

  public openSessionDeletionDialog(session: SessionEntity): void {
    this.sessionDeletionDialog
      .open(SessionDeletionDialogComponent, DIALOG_CONFIG_SMALL)
      .afterClosed()
      .toPromise()
      .then((result) => {
        if (result) {
          this._sessionService
            .deleteSession(session)
            .then(() => this._store.dispatch(new DeleteSessionAction(session)));
        }
      });
  }
}
