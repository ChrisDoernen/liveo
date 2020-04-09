import { ROUTES } from "@liveo/constants";
import { Controller, Post } from "@nestjs/common";
import { ShutdownService } from "../services/shutdown/shutdown-service";

@Controller(`/${ROUTES.admin}/shutdown`)
export class ShutdownController {

  constructor(
    private readonly _shutdownService: ShutdownService
  ) {
  }

  @Post()
  public setShutdown(): void {
    this._shutdownService.shutdown();
  }
}
