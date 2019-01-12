import { controller, httpGet } from "inversify-express-utils";
import { SessionService } from "../lib/sessions/session-service";
import { inject } from "inversify";
import { SessionEntity } from "../lib/sessions/session.entity";

@controller("/api/sessions")
export class SessionController {

    constructor(@inject("SessionService") private _sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): SessionEntity[] {
        return this._sessionService.sessionEntities;
    }
}
