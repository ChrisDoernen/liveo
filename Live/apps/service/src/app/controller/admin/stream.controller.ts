import { ROUTES } from "@live/constants";
import { StreamEntity } from "@live/entities";
import { Request } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
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
  public getStream(request: Request): StreamEntity {
    const id = request.params.id;
    return this._streamService.getStreamEntity(id);
  }
}
