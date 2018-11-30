import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import { Logger } from "./core/util/logger";
import { Types } from "./config/types.config";
import * as bodyParser from "body-parser";
import * as serviceConfig from "./config/service.config";
import "./controller/home";
import "./controller/system";

// Start the server
let server = new InversifyExpressServer(container);
const logger = container.get<Logger>(Types.Logger);
logger.info("Starting Live server...");
logger.info(`Environment: ${serviceConfig.environment}`);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(serviceConfig.port);

logger.info(`Server started, listening on port ${serviceConfig.port}`);
