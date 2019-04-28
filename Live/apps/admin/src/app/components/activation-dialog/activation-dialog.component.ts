import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SessionEntity, ActivationEntity } from "@live/entities";
import { SessionService } from "@live/services";

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
    private _formBuilder: FormBuilder) {
  }

  public ngOnInit() {
    this._sessionService.getSessions()
      .then((sessions) => this.sessions = sessions);

    this.sessionFormGroup = this._formBuilder.group({
      sessionCtrl: ["", Validators.required]
    });
    this.schedulingFormGroup = this._formBuilder.group({
      startTimeCtrl: [""],
      endTimeCtrl: [""]
    });
  }

  public get activationDialogResult(): ActivationEntity {
    return new ActivationEntity(this.sessionFormGroup.value.sessionCtrl);
  }
}
