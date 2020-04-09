// tslint:disable: no-shadowed-variable
import { ROUTES } from "@liveo/constants";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import * as Ffmpeg from "fluent-ffmpeg";
import { AppModule } from "./app/app.module";
import { AppConfig, APP_CONFIG_TOKEN } from "./app/config/configuration";
import { Logger } from "./app/services/logging/logger";
import { environment } from "./environments/environment";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService).get<AppConfig>(APP_CONFIG_TOKEN);
  const logger = app.get(Logger);
  app.useLogger(logger);

  logger.info("Starting liveo server...");
  logger.info(`Version: v${environment.version}/${environment.revision}`);
  logger.debug(`Production: ${config.production}`);
  logger.debug(`Executable: ${config.executable}`);
  logger.debug(`Platform/OS: ${config.platform}`);
  logger.debug(`Architecture: ${config.arch}`);
  logger.debug(`Simulate streaming: ${config.simulate}`);
  logger.debug(`Filesource: ${config.filesource}`);
  logger.debug(`Standalone: ${config.standalone}`);
  logger.debug(`Database: ${config.database}`);
  logger.debug(`Working directory: ${config.workingDirectory}`);
  logger.debug(`Working static files base directory: ${config.staticFilesBaseDirectory}`);
  logger.debug(`Ffmpeg path: ${config.ffmpegPath}`);
  if (config.ffmpegPath === "ffmpeg") {
    logger.warn("Using fallback for ffmpeg path. Did you run 'npm run download-ffmpeg'?");
    logger.warn("Plase make sure the path to ffmpeg is in your PATH environment variable");
    logger.warn("Minimal required ffmpeg version is f15007afa9.");
  }
  // const ffmpegVersionOutput = await this._processExecutionService.executeAsync(`"${config.ffmpegPath}" -version`);
  // const ffmpegVersion = ffmpegVersionOutput.split(EOL)[0];
  // logger.debug(`Ffmpeg version: ${ffmpegVersion}`);

  Ffmpeg.setFfmpegPath(config.ffmpegPath);

  if (config.standalone) {
    logger.debug(`Serving static files in standalone mode.`);

    app.use("/", express.static(`${config.staticFilesBaseDirectory}/${ROUTES.client}`));
    app.use(`/${ROUTES.admin}`, express.static(`${config.staticFilesBaseDirectory}/${ROUTES.admin}`));
  }

  app.setGlobalPrefix(ROUTES.api);
  await app.listen(config.port, () => {
    logger.debug(`Web server started, listening on port ${config.port}.`);
    if (config.executable) {
      const port = config.port === "80" ? "" : `:${config.port}`;
      logger.info(`You can open your browser at http://localhost${port} and http://localhost${port}/admin`);
      logger.info("Press CTRL+C to exit...");
    }
  });
}

bootstrap();
