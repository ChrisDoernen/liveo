import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { AuthenticationService } from "../../../../../server/src/app/services/authentication/authentication-service";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { Principal } from "./principal";

const authService = inject("AuthenticationService");
const logger = inject("Logger");

@Injectable()
export class AuthenticationProvider implements interfaces.AuthProvider {

  @authService private readonly _authenticationService: AuthenticationService;
  @logger private readonly _logger: Logger;

  public async getUser(request: Request, response: Response, next: NextFunction): Promise<interfaces.Principal> {
    const authorizationHeader = request.headers.authorization as string;
    if (!authorizationHeader) {
      return new Principal(null);
    }

    try {
      const b64auth = (authorizationHeader || "").split(" ")[1] || "";
      const [username, password] = Buffer.from(b64auth, "base64").toString().split(":");

      const user = this._authenticationService.authenticate(username, password);
      return new Principal(user);
    } catch (error) {
      return new Principal(null);
    }
  }
}
