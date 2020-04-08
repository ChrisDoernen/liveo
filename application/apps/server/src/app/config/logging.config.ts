import * as winston from "winston";
import { Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./service.config";

const timeLevelMessage = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
);

const serviceLogFileTransport = new DailyRotateFile({
  filename: "liveo-server-%DATE%.log",
  dirname: config.logdirectory,
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
  dirname: config.logdirectory,
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxFiles: "10d",
  level: "debug",
  handleExceptions: true,
  json: true,
  format: timeLevelMessage
});

const consoleTransportOptions = {
  level: config.loglevel,
  handleExceptions: true,
  json: false,
  colorize: true,
  format: timeLevelMessage
};

const consoleTransport = new winston.transports.Console(consoleTransportOptions);

export const ServiceLogger: Logger = winston.createLogger({
  transports: [
    consoleTransport,
    serviceLogFileTransport
  ]
});

export const FfmpegLogger: Logger = winston.createLogger({
  transports: [
    ffmpegLogFileTransport
  ]
});
