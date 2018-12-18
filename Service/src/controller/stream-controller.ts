import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import { StreamService } from "../core/streams/stream-service";
import { Stream } from "../core/streams/stream";

@controller("/api/streams")
export class StreamController {

  constructor(@inject(Types.StreamService) private streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): Stream[] {
    return this.streamService.streams;
  }
}
