import "reflect-metadata"; // This has to be imported first
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/dependencies.config";
import { Logger } from "./core/util/logger";
import { WebsocketService } from "./core/websocket/websocket-service";
import { Types } from "./config/types.config";
import { config } from "./config/service.config";
import * as bodyParser from "body-parser";
import * as socketio from "socket.io";
import "./controller/home-controller";
import "./controller/system-controller";
import "./controller/stream-controller";
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
  app.use((req, res, next) => { logger.debug(`${req.method} request on ${req.url}.`); next(); });
  app.use((err, req, res, next) => { logger.error(`${req.method} request on ${req.url} - ${err}.`); next(); });
});

let httpServer = server.build();

const weboscketServer = socketio(server, { path: "/streams" });
const weboscketService = container.get<WebsocketService>(Types.WebsocketService);

weboscketServer.on("connection", (socket) => {
  weboscketService.onConnection(socket);
});

httpServer.listen(config.port, () => {
  logger.info(`Server started, listening on port ${config.port}.`);
});
