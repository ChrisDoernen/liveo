import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivationEntity, ActivationState, SessionEntity, StreamEntity } from "@live/entities";
import { Logger } from "@live/services";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ActivationService } from "../../../../services/activation/activation.service";
import { SessionService } from "../../../../services/session/session.service";
import { StreamService } from "../../../../services/stream/stream.service";
import { ActivationDeletionDialogComponent } from "../activation-deletion-dialog/activation-deletion-dialog.component";

@Component({
  selector: "dashboard-activation",
  templateUrl: "./dashboard-activation.component.html",
  styleUrls: ["./dashboard-activation.component.scss"]
})
export class DashboardActivationComponent implements OnInit, OnDestroy {

  public activatedSession: SessionEntity;
  public activationState: ActivationState;
  public activation: ActivationEntity;
  private streams: StreamEntity[] = [];
  private _unsubscribeAll = new Subject();

  constructor(
    private readonly _logger: Logger,
    private readonly _activationService: ActivationService,
    public readonly activationDeletionDialog: MatDialog,
    private readonly _sessionService: SessionService,
    private readonly _streamService: StreamService,
    private readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  public get activeStreams(): StreamEntity[] {
    if (this.streams.length === 0 || !this.activatedSession) {
      return [];
    }

    const activeStreams = this.streams.filter((stream) => this.activatedSession.streams.indexOf(stream.id) > -1);
    return activeStreams;
  }

  public ngOnInit(): void {
    this._activationService.activation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((activation) => this.activation = activation);

    this._activationService.activationState$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((activationState) => this.activationState = activationState);

    this._sessionService.activatedSession$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((session) => this.activatedSession = session);

    this._streamService.getStreams()
      .then((streams) => this.streams = streams);
  }

  public openActivationDeletionDialog(): void {
    const dialogRef = this.activationDeletionDialog.open(ActivationDeletionDialogComponent, { width: "250px", restoreFocus: false });

    dialogRef.afterClosed().toPromise().then((result) => {
      this._logger.info(`The dialog was closed, result: ${result}`);

      if (result) {
        this._activationService.deleteActivation();
      }
    });
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }
}
