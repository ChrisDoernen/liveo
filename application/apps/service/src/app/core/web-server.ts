import { ENDPOINTS } from "@liveo/constants";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as path from "path";
import { config } from "../config/service.config";
import { AuthenticationProvider } from "../middleware/authentication/authentication-provider";
import { Logger } from "../services/logging/logger";
import "./../controller/index";

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

      const basePath = config.executable ? process.cwd() : path.resolve(__dirname, "..");

      app.use("/", express.static(path.resolve(basePath + "/client")));
      app.use("/admin", express.static(path.resolve(basePath + "/admin")));

      // Redirect unmatched requests to index files.
      app.get("/admin/*", (req, res) => res.sendFile(path.resolve(basePath + "/admin/index.html")));
      app.get("/*", (req, res) => res.sendFile(path.resolve(basePath + "/client/index.html")));
    }

    const serverInstance = app.listen(config.port);
    this._logger.debug(`Web server started, listening on port ${config.port}.`);
    this._logger.info("LIVE SERVER STARTED");

    if (config.executable) {
      const port = config.port === "80" ? "" : `:${config.port}`;
      this._logger.info(`You can open your browser at http://localhost${port} and http://localhost${port}/admin`);
      this._logger.info("Press CTRL+C to exit...");
    }

    this._serverInstance = serverInstance;
    return serverInstance;
  }

  public shutdown(): void {
    this._serverInstance.close(() => this._logger.debug("Web server stopped."));
  }
}
