import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { Controller, Get } from "@nestjs/common";

@Controller(`${ENDPOINTS.api}/${ROUTES.admin}/connection`)
export class ConnectionController {

  @Get()
  public get(): string {
    return "Online";
  }
}
