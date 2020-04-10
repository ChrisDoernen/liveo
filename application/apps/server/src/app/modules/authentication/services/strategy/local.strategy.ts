import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private _authenticationService: AuthenticationService
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this._authenticationService.authenticate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}