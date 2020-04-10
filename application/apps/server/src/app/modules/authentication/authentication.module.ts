import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { LocalStrategy } from "./services/strategy/local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  providers: [
    AuthenticationService,
    LocalStrategy
  ]
})
export class AuthenticationModule { }