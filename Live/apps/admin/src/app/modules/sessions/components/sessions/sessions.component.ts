import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SessionEntity, StreamEntity } from "@live/entities";
import { DIALOG_CONFIG_SMALL } from "../../../../constants/mat-dialog-config-small";
import { SessionService } from "../../../../services/session/session.service";
import { StreamService } from "../../../../services/stream/stream.service";
import { SessionDeletionDialogComponent } from "../session-deletion-dialog/session-deletion-dialog.component";

@Component({
  selector: "sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.scss"]
})
export class SessionsComponent implements OnInit {

  public sessions: SessionEntity[] = [];
  private _streams: StreamEntity[] = [];

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _streamService: StreamService,
    public readonly sessionDeletionDialog: MatDialog) {
  }

  public ngOnInit():void {
    this._sessionService
      .getSessions()
      .then((sessions) => this.sessions = sessions);
    this._streamService.
      getStreams()
      .then((streams) => this._streams = streams);
  }

  public getStream(streamId: string): StreamEntity {
    return this._streams.find((stream) => stream.id === streamId);
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

  private addSession(session: SessionEntity): void {
    this.sessions.push(session);
  }

  private removeSession(session: SessionEntity): void {
    const sessionIndex = this.sessions.indexOf(session);
    if (sessionIndex > -1) {
      this.sessions.splice(sessionIndex, 1);
    }
  }
}
