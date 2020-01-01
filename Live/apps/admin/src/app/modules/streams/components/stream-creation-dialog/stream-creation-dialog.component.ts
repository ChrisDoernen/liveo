import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceEntity, StreamEntity, StreamType } from "@live/entities";
import { DevicesService } from "../../../../services/devices/devices.service";

@Component({
  selector: "stream-creation-dialog",
  templateUrl: "./stream-creation-dialog.component.html",
  styleUrls: ["./stream-creation-dialog.component.scss"]
})
export class StreamCreationDialogComponent implements OnInit {

  public isLinear = true;
  public titleFormGroup: FormGroup;
  public deviceIdFormGroup: FormGroup;
  public devices: DeviceEntity[];

  constructor(
    private readonly _devicesService: DevicesService,
    private readonly _formBuilder: FormBuilder) {
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

  public get activationDialogResult(): StreamEntity {
    const title = this.titleFormGroup.value.titleCtrl;
    const deviceId = this.deviceIdFormGroup.value.deviceIdCtrl;

    return new StreamEntity(null, title, null, null, deviceId, StreamType.Audio);
  }
}
