export class DetectDevicesAction {
  static readonly type = "[State] DetectDevices";
  constructor(
    public redetect: boolean = false
  ) { }
}
