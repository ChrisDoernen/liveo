import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ThemeController } from "./controller/theme.controller";
import { ThemeRepository } from "./services/theme-repository";
import { ThemeService } from "./services/theme.service";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    ThemeController
  ],
  providers: [
    ThemeService,
    ThemeRepository
  ]
})
export class ThemingModule { }
