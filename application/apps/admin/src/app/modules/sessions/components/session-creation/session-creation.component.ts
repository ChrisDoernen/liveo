import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionEntity, StreamEntity } from "@liveo/entities";
import { SessionService } from "../../../../services/session/session.service";
import { StreamService } from "../../../../services/stream/stream.service";

@Component({
  selector: "session-creation",
  templateUrl: "./session-creation.component.html",
  styleUrls: ["./session-creation.component.scss"]
})
export class SessionCreationComponent implements OnInit {

  public isLinear = true;
  public titleFormGroup: FormGroup;
  public descriptionFormGroup: FormGroup;
  public streamsFormGroup: FormGroup;
  public streams: StreamEntity[];

  constructor(
    private readonly _streamService: StreamService,
    private readonly _sessionService: SessionService,
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router) {
  }

  public ngOnInit(): void {
    this._streamService.getStreams().then((streams) => this.streams = streams);

    this.titleFormGroup = this._formBuilder.group({
      titleCtrl: ["", Validators.required]
    });
    this.descriptionFormGroup = this._formBuilder.group({
      descriptionCtrl: ["", Validators.required]
    });
    this.streamsFormGroup = this._formBuilder.group({
      streamsCtrl: ["", Validators.required]
    });
  }

  private getSession(): SessionEntity {
    const title = this.titleFormGroup.value.titleCtrl;
    const description = this.descriptionFormGroup.value.descriptionCtrl;
    const streamIds = this.streamsFormGroup.value.streamsCtrl;

    return new SessionEntity(null, title, description, streamIds);
  }

  public saveSession(): void {
    const session = this.getSession();
    this._sessionService
      .createSession(session)
      .then(() => this._router.navigate([".."], { relativeTo: this._activatedRoute }));
  }
}
