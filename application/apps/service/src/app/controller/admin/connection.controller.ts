import { ROUTES } from "@liveo/constants";
import { controller, httpGet } from "inversify-express-utils";

@controller(`/${ROUTES.admin}/connection`)
export class HelloController {

  @httpGet("/")
  public get(): string {
    return "Online";
  }
}
