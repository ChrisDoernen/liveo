import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SessionEntity, ActivationEntity } from "@live/entities";
import { SessionService } from "@live/services";
import { TimeService } from "../../services/time.service";

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

  constructor(private _sessionService: SessionService,
    private _formBuilder: FormBuilder,
    private _timeService: TimeService) {
  }

  public ngOnInit() {
    this._sessionService.getSessions()
      .subscribe((sessions) => this.sessions = sessions);

    this.sessionFormGroup = this._formBuilder.group({
      sessionCtrl: ["", Validators.required]
    });
    this.schedulingFormGroup = this._formBuilder.group({
      startTimeCtrl: [""],
      endTimeCtrl: [""]
    });
  }

  public get activationDialogResult(): ActivationEntity {
    const sessionId = this.sessionFormGroup.value.sessionCtrl;
    const startTimeInput = this.schedulingFormGroup.value.startTimeCtrl;
    const startTime = this._timeService.getTimestampFromTimeString(startTimeInput);
    const endTimeInput = this.schedulingFormGroup.value.endTimeCtrl;
    const endTime = this._timeService.getTimestampFromTimeString(endTimeInput);

    return new ActivationEntity(sessionId, startTime, endTime);
  }
}
