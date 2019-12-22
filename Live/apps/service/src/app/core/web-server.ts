import { ENDPOINTS } from "@live/constants";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as path from "path";
import { config } from "../config/service.config";
import "../controller/admin/activation.controller";
import "../controller/admin/authentication.controller";
// Controllers have to be registered here
import "../controller/admin/connection.controller";
import "../controller/admin/session.controller";
import "../controller/admin/settings.controller";
import "../controller/admin/shutdown.controller";
import "../controller/admin/stream.controller";
import "../controller/client/application-state.controller";
import { AuthenticationProvider } from "../middleware/authentication/authentication-provider";
import { Logger } from "../services/logging/logger";

@injectable()
export class WebServer {
  private _serverInstance: Server;

  constructor(
    @inject("Logger") private _logger: Logger) {
  }

  public initializeAndListen(container: any): Server {
    const expressServer =
      new InversifyExpressServer(container, null, { rootPath: ENDPOINTS.api }, null, AuthenticationProvider);

    expressServer.setConfig(server => {
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json());
      server.enable("trust proxy");

      server.use(ENDPOINTS.api, (req, res, next) => {
        this._logger.debug(`${req.method} request on ${req.url}.`);
        next();
      });
    });

    expressServer.setErrorConfig(server => {
      server.use(ENDPOINTS.api, (err, req, res, next) => {
        this._logger.error(`${req.method} request on ${req.url} - ${err}.`);
        next();
      });
    });

    const app = expressServer.build();

    if (config.standalone) {
      this._logger.debug(`Serving static files in standalone mode.`);
      app.use("/", express.static(path.resolve(__dirname + "/../client")));
      app.use("/admin", express.static(path.resolve(__dirname + "/../admin")));

      // Redirect unmatched requests to index files.
      app.get("/admin/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../admin/index.html")));
      app.get("/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../client/index.html")));
    }

    const serverInstance = app.listen(config.port);
    this._logger.debug(`Web server started, listening on port ${config.port}.`);
    this._logger.info("LIVE SERVER STARTED");

    if (config.executable) {
      this._logger.info("Press CTRL+C to exit...");
    }

    this._serverInstance = serverInstance;
    return serverInstance;
  }

  public shutdown(): void {
    this._serverInstance.close(() => this._logger.debug("Web server stopped."));
  }
}
