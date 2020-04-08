import { ROUTES } from "@liveo/constants";
import { StreamEntity } from "@liveo/entities";
import { Controller, Get } from "@nestjs/common";
import { StreamService } from "../services/streams/stream-service";

@Controller(`/${ROUTES.admin}/streams`)
export class StreamController {

  constructor(
    private _streamService: StreamService) {
  }

  @Get("/")
  public getStreams(): StreamEntity[] {
    return this._streamService.getStreamEntities();
  }
}
