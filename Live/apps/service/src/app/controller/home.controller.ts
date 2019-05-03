import { controller, httpGet } from "inversify-express-utils";

@controller("/hello")
export class HelloController {

  @httpGet("/")
  public get(): string {
    return "Live";
  }
}
