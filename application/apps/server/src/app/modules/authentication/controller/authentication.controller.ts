import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-authentication.guard";

@Controller(`${ENDPOINTS.api}/${ROUTES.admin}/authentication`)
export class AuthenticationController {

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() request) {
    return request.user;
  }
}
