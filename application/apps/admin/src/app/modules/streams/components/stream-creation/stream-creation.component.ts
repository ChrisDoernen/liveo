import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EVENTS } from "@liveo/constants";
import { DeviceEntity, StreamEntity, StreamType } from "@liveo/entities";
import { Select, Store } from "@ngxs/store";
import { DetectDevicesAction } from "apps/admin/src/app/actions/devices.actions";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { StreamsClient } from "../../../../services/stream/streams.client";
import { WebsocketService } from "../../../../services/websocket/websocket.service";

@Component({
  selector: "stream-creation",
  templateUrl: "./stream-creation.component.html",
  styleUrls: ["./stream-creation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamCreationComponent implements OnInit, OnDestroy {

  public isLinear = true;
  public titleFormGroup: FormGroup;
  public deviceIdFormGroup: FormGroup;

  @Select()
  public devices$: Observable<DeviceEntity[]>;

  constructor(
    private readonly _store: Store,
    private readonly _streamService: StreamsClient,
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _websocketService: WebsocketService,
    private readonly _router: Router
  ) {
  }

  public ngOnInit(): void {
    this._websocketService.emit(EVENTS.adminStreamCreationEnter);

    this.titleFormGroup = this._formBuilder.group({
      titleCtrl: ["", Validators.required]
    });
    this.deviceIdFormGroup = this._formBuilder.group({
      deviceIdCtrl: ["", Validators.required]
    });
  }

  private async getStream(): Promise<StreamEntity> {
    const title = this.titleFormGroup.value.titleCtrl;
    const deviceId = this.deviceIdFormGroup.value.deviceIdCtrl;
    const devices = await this.devices$.pipe(take(1)).toPromise();
    const streamingId = devices.find((device) => device.id === deviceId).streamingId;

    return new StreamEntity(null, title, null, null, deviceId, streamingId, StreamType.Audio);
  }

  public saveStream(): void {
    this.getStream().then((stream) => {
      this._streamService
        .createStream(stream)
        .then(() => this._router.navigate([".."], { relativeTo: this._activatedRoute }));
    });
  }

  public refresh(): void {
    this._store.dispatch(new DetectDevicesAction(true));
  }

  public ngOnDestroy(): void {
    this._websocketService.emit(EVENTS.adminStreamCreationLeave);
  }
}
