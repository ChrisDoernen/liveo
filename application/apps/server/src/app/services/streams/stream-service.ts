import { StreamEntity, StreamType } from "@liveo/entities";

/**
 * A class providing methods to manage streams
 */
export class StreamService {

  public getStreamEntities(): StreamEntity[] {
    return [new StreamEntity("123", "s", "b", "ds", "sd", "sdf", StreamType.Audio)];
  }

}
