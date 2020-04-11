import { Injectable } from "@nestjs/common";
import * as winston from "winston";
import { Logger as WinstonLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { AppConfig } from "../../configuration/app-config";

/**
 * Wrapper class for logging
 */
@Injectable()
export class Logger {

  private _logger: WinstonLogger;

  constructor(
    appConfig: AppConfig
  ) {
    this.initialize(appConfig);
  }

  private initialize(appConfig: AppConfig): void {
    const timeLevelMessage = winston.format.combine(
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
    );

    const serviceLogFileTransport = new DailyRotateFile({
      filename: "liveo-server-%DATE%.log",
      dirname: appConfig.logdirectory,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "30d",
      level: "debug",
      handleExceptions: true,
      json: true,
      format: timeLevelMessage
    });

    const ffmpegLogFileTransport = new DailyRotateFile({
      filename: "liveo-ffmpeg-%DATE%.log",
      dirname: appConfig.logdirectory,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "10d",
      level: "debug",
      handleExceptions: true,
      json: true,
      format: timeLevelMessage
    });

    const consoleTransportOptions = {
      level: appConfig.loglevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      format: timeLevelMessage
    };

    const consoleTransport = new winston.transports.Console(consoleTransportOptions);

    this._logger = winston.createLogger({
      transports: [
        consoleTransport,
        serviceLogFileTransport
      ]
    });
  }

  public log(message: string): void {
  }

  public debug(message: string): void {
    this._logger.debug(message);
  }

  public info(message: string): void {
    this._logger.info(message);
  }

  public warn(message: string): void {
    this._logger.warn(message);
  }

  public error(message: string): void {
    this._logger.error(message);
  }
}
