import { controller, httpGet } from "inversify-express-utils";
import { StreamService } from "../lib/streams/stream-service";
import { StreamData } from "../lib/streams/stream-data";
import { inject } from "inversify";

@controller("/api/streams")
export class StreamController {

  constructor(@inject("StreamService") private _streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): StreamData[] {
    return this._streamService.getStreamData();
  }
}
