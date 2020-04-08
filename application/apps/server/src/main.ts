// tslint:disable: no-shadowed-variable
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import * as Ffmpeg from "fluent-ffmpeg";
import { resolve } from "path";
import { AppModule } from "./app/app.module";
import { CONFIG_INJECTION_TOKEN } from "./app/config/service.config";
import { Logger } from "./app/services/logging/logger";
import { environment } from "./environments/environment";

config({ path: resolve(process.cwd(), "liveo.env") });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false, });

  const config = app.get(CONFIG_INJECTION_TOKEN);
  const logger = new Logger(config);
  app.useLogger(logger);

  logger.info("STARTING LIVE SERVER");
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




  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/" + globalPrefix);
  });
}

bootstrap();
