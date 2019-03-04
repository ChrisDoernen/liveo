import { StreamType } from "./stream-type";

/**
 * Stream data transfer object
 */
export class Stream {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public countryCode: string,
    public streamType: StreamType) {
    console.debug(`Instantiating stream with id ${id}.`);
  }
}
