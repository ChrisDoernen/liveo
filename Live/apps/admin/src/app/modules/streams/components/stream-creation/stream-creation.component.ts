import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceEntity, StreamEntity, StreamType } from "@live/entities";
import { DevicesService } from "../../../shared/services/devices/devices.service";
import { StreamService } from "../../../shared/services/stream/stream.service";

@Component({
  selector: "stream-creation",
  templateUrl: "./stream-creation.component.html",
  styleUrls: ["./stream-creation.component.scss"]
})
export class StreamCreationComponent implements OnInit {

  public isLinear = true;
  public titleFormGroup: FormGroup;
  public deviceIdFormGroup: FormGroup;
  public devices: DeviceEntity[];

  constructor(
    private readonly _streamService: StreamService,
    private readonly _devicesService: DevicesService,
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router) {
  }

  public ngOnInit(): void {
    this._devicesService.getDevices().then((devices) => this.devices = devices);

    this.titleFormGroup = this._formBuilder.group({
      titleCtrl: ["", Validators.required]
    });
    this.deviceIdFormGroup = this._formBuilder.group({
      deviceIdCtrl: ["", Validators.required]
    });
  }

  private getStream(): StreamEntity {
    const title = this.titleFormGroup.value.titleCtrl;
    const deviceId = this.deviceIdFormGroup.value.deviceIdCtrl;
    const streamingSourceId = this.devices.find((device) => device.id === deviceId).streamingSourceId;

    return new StreamEntity(null, title, null, null, deviceId, streamingSourceId, StreamType.Audio);
  }

  public saveStream(): void {
    const stream = this.getStream();
    this._streamService
      .createStream(stream)
      .then(() => this._router.navigate([".."], { relativeTo: this._activatedRoute }));
  }
}
