import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import { StreamService } from "../core/streams/stream-service";
import { StreamEntity } from "../core/streams/stream-entity";

@controller("/api/streams")
export class StreamController {

  constructor(@inject(Types.StreamService) private streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): StreamEntity[] {
    return this.streamService.getStreamEntities();
  }
}
