import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/dependencies.config";
import { Logger } from "./core/util/logger";
import { Types } from "./config/types.config";
import * as bodyParser from "body-parser";
import * as serviceConfig from "./config/service.config";
import "./controller/home";
import "./controller/system";
import "./controller/streams";

// Start the server
let server = new InversifyExpressServer(container);
const logger = container.get<Logger>(Types.Logger);
logger.info("Starting Live server...");
logger.info(`Environment: ${serviceConfig.environment}.`);
logger.info(`OS: ${serviceConfig.os}.`);
logger.info(`Architecture: ${serviceConfig.arch}.`);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(serviceConfig.port, () => {
  logger.info(`Server started, listening on port ${serviceConfig.port}.`);
});
