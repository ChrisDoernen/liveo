import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { LocalStrategy } from "./services/strategy/local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  controllers: [
    AuthenticationController
  ],
  providers: [
    AuthenticationService,
    LocalStrategy
  ]
})
export class AuthenticationModule { }