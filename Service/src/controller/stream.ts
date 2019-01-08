import { controller, httpGet } from "inversify-express-utils";
import { StreamService } from "../lib/streams/stream-service";
import { inject } from "inversify";
import { StreamEntity } from "../lib/streams/stream.entity";
import { Request } from "express";

@controller("/api/streams")
export class StreamController {

  constructor(@inject("StreamService") private _streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): StreamEntity[] {
    return this._streamService.getStreamEntities();
  }

  @httpGet("/:id")
  public getStream(request: Request): StreamEntity {
    const id = request.params.id;
    return this._streamService.getStreamEntity(id);
  }
}