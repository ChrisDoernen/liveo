import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { DataService } from "./services/data/data.service";

@Module({
  imports: [
    SharedModule
  ],
  providers: [
    DataService
  ],
  exports: [
    DataService
  ]
})
export class DatabaseModule { }
