import { Types } from "../config/types.config";
import { controller, httpGet } from "inversify-express-utils";
import { SessionService } from "../core/sessions/session-service";
import { inject } from "inversify";

@controller("/sessions")
export class StreamsController {

    constructor(@inject(Types.SessionService) private sessionService: SessionService) { }

    @httpGet("/")
    public get(): string {
        return "Get sessions";
    }
}
