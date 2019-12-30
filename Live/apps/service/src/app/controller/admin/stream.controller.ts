import { ROUTES } from "@live/constants";
import { StreamEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { StreamService } from "../../services/streams/stream-service";

@controller(`/${ROUTES.admin}/streams`)
export class StreamController {
  constructor(
    @inject("StreamService") private _streamService: StreamService) {
  }

  @httpGet("/")
  public getStreams(): StreamEntity[] {
    return this._streamService.getStreamEntities();
  }

  @httpGet("/:id")
  public getStream(request: Request, response: Response): StreamEntity {
    const id = request.params.id;
    const stream = this._streamService.getStreamEntity(id);
    if (!stream) {
      response.status(404).send("Stream not found");
    }

    return stream;
  }

  @httpPost("/")
  public createStream(request: Request): void {
    const stream = request.body as StreamEntity;
    
    return this._streamService.createStream(stream);
  }
}
