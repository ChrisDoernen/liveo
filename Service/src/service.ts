import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import * as bodyParser from "body-parser";
import * as logger from "./config/logging.config";
import * as serviceConfig from "./config/service.config";
import "./controller/home";
import "./controller/system";

logger.info("Starting Live server...");

// Start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(serviceConfig.port);

logger.info(`Server started, listening on port ${serviceConfig.port}`);
