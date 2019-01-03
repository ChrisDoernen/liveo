import { controller, httpGet } from "inversify-express-utils";
import { StreamService } from "../lib/streams/stream-service";
import { inject } from "inversify";
import { StreamEntity } from "../lib/streams/stream.entity";
import express = require("express");

@controller("/api/streams")
export class StreamController {

  constructor(@inject("StreamService") private _streamService: StreamService) { }

  @httpGet("/")
  public getStreams(): StreamEntity[] {
    return this._streamService.getStreamEntities();
  }

  @httpGet("/:id")
  public getStream(request: express.Request): StreamEntity {
    const id = request.param("id");
    return this._streamService.getStreamEntity(id);
  }
}
