import { ROUTES } from "@liveo/constants";
import { Controller, Get } from "@nestjs/common";

@Controller(`/${ROUTES.admin}/connection`)
export class ConnectionController {

  @Get()
  public get(): string {
    return "Online";
  }
}
