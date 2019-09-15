import { InversifyExpressServer } from "inversify-express-utils";
import { Logger } from "../logging/logger";
import { config } from "../../config/service.config";
import { injectable, inject } from "inversify";
import * as bodyParser from "body-parser";
import { ENDPOINTS } from "@live/constants";
import * as express from "express";
import * as path from "path";
import { Server } from "http";

// Controllers have to be registered here
import "../../controller/home.controller";
import "../../controller/admin/shutdown.controller";
import "../../controller/admin/stream.controller";
import "../../controller/admin/session.controller";
import "../../controller/admin/activation.controller";
import "../../controller/admin/settings.controller";
import "../../controller/client/application-state.controller";

@injectable()
export class WebServer {
  private _serverInstance: Server;

  constructor(@inject("Logger") private _logger: Logger) {
  }

  public initializeAndListen(container: any): Server {
    const expressServer = new InversifyExpressServer(container, null, { rootPath: ENDPOINTS.api });

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
      this._logger.info(`Serving static files in standalone mode.`);
      app.use("/", express.static(path.resolve(__dirname + "/../client")));
      app.use("/admin", express.static(path.resolve(__dirname + "/../admin")));

      // Redirect unmatched requests to index files.
      app.get("/admin/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../admin/index.html")));
      app.get("/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../client/index.html")));
    }

    const serverInstance = app.listen(config.port);
    this._logger.info(`Web server started, listening on port ${config.port}.`);

    this._serverInstance = serverInstance;
    return serverInstance;
  }

  public shutdown(): void {
    this._serverInstance.close(() => this._logger.info("Web server stopped."));
  }
}
