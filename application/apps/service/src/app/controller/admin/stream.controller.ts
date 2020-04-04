import { ROUTES } from "@live/constants";
import { StreamEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { StreamService } from "../../services/streams/stream-service";

@controller(`/${ROUTES.admin}/streams`, AuthenticationMiddleware)
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
  public createStream(request: Request): StreamEntity {
    const stream = request.body as StreamEntity;

    return this._streamService.createStream(stream);
  }

  @httpDelete("/:id")
  public deleteStream(request: Request): void {
    const streamId = request.params.id;
    this._streamService.deleteStream(streamId);
  }
}
