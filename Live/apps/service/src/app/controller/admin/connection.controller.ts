import { controller, httpGet } from "inversify-express-utils";
import { ROUTES } from "@live/constants";

@controller(`/${ROUTES.admin}/connection`)
export class HelloController {

  @httpGet("/")
  public get(): string {
    return "Online";
  }
}
