import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/dependencies.config";
import { Logger } from "./core/util/logger";
import { Types } from "./config/types.config";
import { config } from "./config/service.config";
import * as bodyParser from "body-parser";
import "./controller/home";
import "./controller/system";
import "./controller/streams";

let server = new InversifyExpressServer(container);
const logger = container.get<Logger>(Types.Logger);
logger.info("Starting Live server...");
logger.info(`Environment: ${config.environment}.`);
logger.info(`OS: ${config.os}.`);
logger.info(`Architecture: ${config.arch}.`);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(config.port, () => {
  logger.info(`Server started, listening on port ${config.port}.`);
});
