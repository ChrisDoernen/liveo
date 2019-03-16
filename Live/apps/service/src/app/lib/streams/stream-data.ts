import { StreamType } from "./stream-type";

/**
 * Class representing a live stream data transfer object
 */
export class StreamData {

  public id: string;

  public title: string;

  public countryCode: string;

  public deviceId: string;

  public streamType: StreamType;

  constructor(id: string, title: string, countryCode: string, deviceId: string, streamType: StreamType) {
    this.id = id;
    this.title = title;
    this.countryCode = countryCode;
    this.deviceId = deviceId;
    this.streamType = streamType;
  }
}
