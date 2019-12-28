import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceEntity, StreamEntity, StreamType } from "@live/entities";
import { DevicesService } from "../../services/devices/devices.service";

@Component({
  selector: "new-stream-dialog",
  templateUrl: "./new-stream-dialog.component.html",
  styleUrls: ["./new-stream-dialog.component.scss"]
})
export class NewStreamDialogComponent implements OnInit {

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
    const title = this.titleFormGroup.value.sessionCtrl;
    const deviceId = this.deviceIdFormGroup.value.deviceIdCtlrl;

    return new StreamEntity(null, title, null, null, deviceId, StreamType.Audio);
  }
}
