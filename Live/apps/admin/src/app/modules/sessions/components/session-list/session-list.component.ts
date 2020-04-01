import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SessionEntity, StreamEntity } from "@live/entities";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
import { SessionService } from "../../../../services/session/session.service";
import { StreamService } from "../../../../services/stream/stream.service";
import { SessionDeletionDialogComponent } from "../session-deletion-dialog/session-deletion-dialog.component";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionListComponent implements OnInit {

  public loading: boolean;
  public error: Error;
  public sessions: SessionEntity[] = [];
  private _streams: StreamEntity[] = [];
  public displayedColumns: string[] = ["title", "description", "streams", "delete"];

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _streamService: StreamService,
    public readonly sessionDeletionDialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.loading = true;
    Promise.all([this._sessionService.getSessions(), this._streamService.getStreams()])
      .then(([sessions, streams]) => {
        this.sessions = sessions;
        this._streams = streams;
        this.loading = false;
        this._changeDetectorRef.detectChanges();
      }).catch((error) => {
        this.error = error;
        this.loading = false;
        this._changeDetectorRef.detectChanges();
      });
  }

  public getStreamTitles(streamIds: string[]): string {
    const titles = streamIds.map((id) => {
      const foundStream = this._streams.find((stream) => stream.id === id);
      return foundStream ? foundStream.title : null;
    }).filter((stream) => !!stream);

    return titles.join(", ");
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
            .then(() => this.removeSession(session));
        }
      });
  }

  private removeSession(session: SessionEntity): void {
    const sessionIndex = this.sessions.indexOf(session);
    if (sessionIndex > -1) {
      this.sessions.splice(sessionIndex, 1);
    }
    this.sessions = [...this.sessions];
    this._changeDetectorRef.detectChanges();
  }
}
