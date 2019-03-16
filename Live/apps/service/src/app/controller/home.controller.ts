import { controller, httpGet } from "inversify-express-utils";

@controller("/home")
export class HomeController {

  @httpGet("/")
  public get(): string {
    return "Hello World";
  }
}
