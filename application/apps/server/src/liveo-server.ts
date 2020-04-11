// tslint:disable: no-shadowed-variable
import { ROUTES } from "@liveo/constants";
import { NestFactory } from "@nestjs/core";
import { execSync } from "child_process";
import * as express from "express";
import * as Ffmpeg from "fluent-ffmpeg";
import { EOL } from "os";
import { AppModule } from "./app/app.module";
import { AppConfig } from "./app/modules/core/configuration/app-config";
import { Logger } from "./app/modules/core/services/logging/logger";
import { DevicesService } from "./app/modules/devices/services/devices/device.service";
import { environment } from "./environments/environment";

const checkRequirements = (appConfig: AppConfig) => {
  if (appConfig.architecture !== "x64") {
    console.error(`Unsupported architecture: ${appConfig.architecture}`);
    process.exit(1);
  }
  if (appConfig.platform !== "linux" && appConfig.platform !== "win32") {
    console.error(`Unsupported platform: ${appConfig.platform}`);
    process.exit(1);
  }
}

const logAppConfig = (logger: Logger, appConfig: AppConfig) => {
  logger.info("Starting liveo server...");
  logger.info(`Version: v${environment.version}/${environment.revision}`);
  logger.debug(`Production: ${appConfig.production}`);
  logger.debug(`Executable: ${appConfig.executable}`);
  logger.debug(`Platform/OS: ${appConfig.platform}`);
  logger.debug(`Architecture: ${appConfig.architecture}`);
  logger.debug(`Simulate streaming: ${appConfig.simulate}`);
  logger.debug(`Standalone: ${appConfig.standalone}`);
  logger.debug(`Database: ${appConfig.database}`);
  logger.debug(`Working directory: ${appConfig.workingDirectory}`);
  logger.debug(`Static files base directory: ${appConfig.staticFilesBaseDirectory}`);
  logger.debug(`FFmpeg path: ${appConfig.ffmpegPath}`);
  if (appConfig.ffmpegPath === "ffmpeg") {
    logger.warn("Using fallback for ffmpeg path. Did you run 'npm run download-ffmpeg'?");
    logger.warn("Plase make sure the path to ffmpeg is in your PATH environment variable");
    logger.warn("Minimal required ffmpeg version is f15007afa9.");
  }
  const ffmpegVersionOutput = execSync(`"${appConfig.ffmpegPath}" -version`).toString();
  const ffmpegVersion = ffmpegVersionOutput.split(EOL)[0];
  logger.debug(`FFmpeg version: ${ffmpegVersion}`);
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);
  const logger = app.get(Logger);
  const devicesService = app.get(DevicesService);

  app.useLogger(logger);

  checkRequirements(appConfig);
  logAppConfig(logger, appConfig);
  Ffmpeg.setFfmpegPath(appConfig.ffmpegPath);

  await devicesService.initialize();

  if (appConfig.standalone) {
    logger.debug(`Serving static files in standalone mode.`);

    app.use("/", express.static(`${appConfig.staticFilesBaseDirectory}/${ROUTES.client}`));
    app.use(`/${ROUTES.admin}`, express.static(`${appConfig.staticFilesBaseDirectory}/${ROUTES.admin}`));
  }

  await app.listen(appConfig.port, () => {
    logger.debug(`Web server started, listening on port ${appConfig.port}.`);
    if (appConfig.executable) {
      const port = appConfig.port === "80" ? "" : `:${appConfig.port}`;
      logger.info(`You can open your browser at http://localhost${port} and http://localhost${port}/admin`);
      logger.info("Press CTRL+C to exit...");
    }
  });
}

bootstrap();
