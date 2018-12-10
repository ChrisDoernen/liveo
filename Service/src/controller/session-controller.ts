import { Types } from "../config/types.config";
import { controller, httpGet } from "inversify-express-utils";
import { SessionService } from "../core/sessions/session-service";
import { inject } from "inversify";
import { Session } from "../core/sessions/session";

@controller("/sessions")
export class SessionController {

    constructor(@inject(Types.SessionService) private sessionService: SessionService) { }

    @httpGet("/")
    public get(): Session[] {
        return this.sessionService.sessions;
    }
}
