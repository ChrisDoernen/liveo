import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/dependencies.config";
import { Logger } from "./core/util/logger";
import { Types } from "./config/types.config";
import { config } from "./config/service.config";
import * as bodyParser from "body-parser";
import "./controller/home-controller";
import "./controller/system-controller";
import "./controller/streams-controller";
import "./controller/session-controller";

let server = new InversifyExpressServer(container);
const logger = container.get<Logger>(Types.Logger);
logger.info("Starting Live server...");
logger.debug(`Environment: ${config.environment}.`);
logger.debug(`OS: ${config.os}.`);
logger.debug(`Architecture: ${config.arch}.`);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => { logger.debug(`${req.method} request on ${req.url} - ${res.status}.`); next(); });
  app.use((err, req, res, next) => { logger.error(`${req.method} request on ${req.url} - ${err}.`); next(); });
});

let serverInstance = server.build();
serverInstance.listen(config.port, () => {
  logger.info(`Server started, listening on port ${config.port}.`);
});
