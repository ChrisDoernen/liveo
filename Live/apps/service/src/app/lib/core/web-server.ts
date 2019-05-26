import { InversifyExpressServer } from "inversify-express-utils";
import { Logger } from "../logging/logger";
import { ServiceConfig } from "../../config/service.config";
import { injectable, inject } from "inversify";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import "../../controller/home.controller";
import "../../controller/shutdown.controller";
import "../../controller/stream.controller";
import "../../controller/session.controller";
import "../../controller/activation.controller";
import "../../controller/activity.controller";

const APIBASE = "/api";

@injectable()
export class WebServer {
  constructor(@inject("Logger") private _logger: Logger) {
  }

  public initializeAndListen(container: any): any {
    const expressServer = new InversifyExpressServer(container, null, { rootPath: APIBASE });

    expressServer.setConfig(server => {
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json());
      server.enable("trust proxy");

      server.use(APIBASE, (req, res, next) => {
        this._logger.debug(`${req.method} request on ${req.url}.`);
        next();
      });
    });

    expressServer.setErrorConfig(server => {
      server.use(APIBASE, (err, req, res, next) => {
        this._logger.error(`${req.method} request on ${req.url} - ${err}.`);
        next();
      });
    });

    const server = expressServer.build();

    if (ServiceConfig.standalone) {
      this._logger.info(`Serving static files in standalone mode.`);
      server.use("/", express.static(path.resolve(__dirname + '/../client')));
      server.use("/admin", express.static(path.resolve(__dirname + '/../admin')));

      // Redirect unmatched requests to index files.
      server.get("/admin/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../admin/index.html")));
      server.get("/*", (req, res) => res.sendFile(path.resolve(__dirname + "/../client/index.html")));
    }

    const serverInstance = server.listen(ServiceConfig.port);
    this._logger.info(`Web server started, listening on port ${ServiceConfig.port}.`);

    return serverInstance;
  }
}
