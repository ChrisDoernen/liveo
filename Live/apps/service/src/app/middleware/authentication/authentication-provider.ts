import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { AuthenticationService } from "../../services/authentication/authentication-service";
import { Principal } from "./principal";

const authService = inject("AuthenticationService");

@injectable()
export class AuthenticationProvider implements interfaces.AuthProvider {

  @authService private readonly _authenticationService: AuthenticationService;

  public async getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
    const authorizationHeader = req.headers.authorization as string;
    const b64auth = (authorizationHeader || "").split(" ")[1] || "";
    //const [username, password] = new Buffer(b64auth, "base64").toString().split(":");
    //const userToAuthenticate = new UserEntity(username, password);

    //const user = this._authenticationService.getUser(userToAuthenticate);
    const principal = new Principal(null);

    return principal;
  }
}
