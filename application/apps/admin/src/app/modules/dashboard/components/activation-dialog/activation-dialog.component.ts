import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivationEntity, SessionEntity } from "@liveo/entities";
import { TimeService } from "@liveo/services";
import { SessionClient } from "../../../../services/session/session.service";

@Component({
  selector: "activation-dialog",
  templateUrl: "./activation-dialog.component.html",
  styleUrls: ["./activation-dialog.component.scss"]
})
export class ActivationDialogComponent implements OnInit {

  public isLinear = true;
  public sessionFormGroup: FormGroup;
  public schedulingFormGroup: FormGroup;
  public sessions: SessionEntity[];

  constructor(
    private _sessionService: SessionClient,
    private _formBuilder: FormBuilder,
    private _timeService: TimeService
  ) {
  }

  public ngOnInit(): void {
    this._sessionService.getSessions().then((sessions) => this.sessions = sessions);

    this.sessionFormGroup = this._formBuilder.group({
      sessionCtrl: ["", Validators.required]
    });
    this.schedulingFormGroup = this._formBuilder.group({
      startTimeCtrl: [null],
      endTimeCtrl: [null]
    });
  }

  public get activationDialogResult(): ActivationEntity {
    const sessionId = this.sessionFormGroup.value.sessionCtrl;
    const startTimeInput = this.schedulingFormGroup.value.startTimeCtrl;
    const endTimeInput = this.schedulingFormGroup.value.endTimeCtrl;

    const startTime = this.getDateFromTimeInput(startTimeInput);
    const endTime = this.getDateFromTimeInput(endTimeInput);

    return new ActivationEntity(sessionId, startTime, endTime);
  }

  private getDateFromTimeInput(time: string): string {
    if (!time) {
      return null;
    }

    const now = this._timeService.now();
    const timeSplit = time.split(":");
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), +timeSplit[0], +timeSplit[1]).toISOString();
  }
}
