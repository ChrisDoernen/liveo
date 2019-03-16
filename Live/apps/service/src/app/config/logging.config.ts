import * as appRoot from 'app-root-path';
import * as winston from 'winston';
import { Logger } from 'winston';
import { ServiceConfig } from './service.config';

const timeLevelMessage = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level} ${info.message}`
  )
);

const options = {
  serviceLogFile: {
    level: 'debug',
    filename: ServiceConfig.logfilename,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: timeLevelMessage
  },
  ffmpegLogFile: {
    level: 'debug',
    filename: ServiceConfig.ffmpeglogfilename,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: timeLevelMessage
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: timeLevelMessage
  }
};

export const ServiceLogger: Logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.serviceLogFile)
  ]
});

export const FfmpegLogger: Logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.ffmpegLogFile)
  ]
});
