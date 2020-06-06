import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import { AppConfigProvider } from "./configuration/app-config.provider";
import { configuration } from "./configuration/configuration";
import { Logger } from "./services/logging/logger";

// When the app is packaged using pkg, we are in a snapshot file system,
// see https://www.npmjs.com/package/pkg#snapshot-filesystem
const isExecutable = __dirname.includes("snapshot");
const applicationDirectory = isExecutable ? join(process.execPath, "..") : __dirname;
const envFileName = "liveo.env";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(applicationDirectory, envFileName),
      load: [() => configuration(isExecutable, applicationDirectory)]
    }),
  ],
  providers: [
    AppConfigProvider,
    Logger
  ],
  exports: [
    AppConfigProvider,
    Logger
  ]
})
export class CoreModule { }
