import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import * as logger from "./config/logging.config";
import "reflect-metadata";
import * as serviceConfig from "./config/service.config";
import "./controller/home";

logger.info("Starting Live server...");

// Load everything needed to the Container
let container = new Container();
// container.bind<UserService>(TYPES.UserService).to(UserService);

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
