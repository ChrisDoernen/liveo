import { StreamType } from "./stream-type";

/**
 * Session data transfer object for communication with the client
 */
export class StreamEntity {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public countryCode: string,
    public streamType: StreamType,
    public isStarted: boolean) {
  }
}
