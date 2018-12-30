import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import { StreamService } from "../core/streams/stream-service";
import { StreamData } from "../core/streams/stream-data";

@controller("/api/streams")
export class StreamController {

  constructor(@inject(Types.StreamService) private streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): StreamData[] {
    return this.streamService.getStreamData();
  }
}
