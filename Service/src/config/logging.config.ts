import * as appRoot from "app-root-path";
import * as winston from "winston";

const options = {
    file: {
        level: "info",
        filename: `${appRoot}/dist/live-service.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ]
});

export = logger;
