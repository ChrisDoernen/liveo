import { controller, httpGet } from "inversify-express-utils";
import { SessionService } from "../lib/sessions/session-service";
import { inject } from "inversify";
import { SessionEntity } from "../lib/sessions/session.entity";

@controller("/client")
export class ClientController {

    constructor(@inject("SessionService") private _sessionService: SessionService) { }

    @httpGet("/session")
    public getActiveSessionEntity(): SessionEntity {
        return this._sessionService.activeSessionEntity;
    }
}
