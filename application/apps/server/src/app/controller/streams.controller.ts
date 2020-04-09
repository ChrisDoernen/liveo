import { ROUTES } from "@liveo/constants";
import { StreamEntity } from "@liveo/entities";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { StreamService } from "../services/streams/stream-service";

@Controller(`/${ROUTES.admin}/streams`)
export class StreamsController {

  constructor(
    private readonly _streamService: StreamService
  ) {
  }

  @Get()
  public getStreams(): StreamEntity[] {
    return this._streamService.getStreamEntities();
  }

  @Get(":id")
  public getStream(@Param("id") id): StreamEntity {
    return this._streamService.getStreamEntity(id);
  }

  @Post()
  public createStream(@Body() stream: StreamEntity): StreamEntity {
    return this._streamService.createStream(stream);
  }

  @Delete(":id")
  public deleteStream(@Param("id") id): void {
    this._streamService.deleteStream(id);
  }
}
