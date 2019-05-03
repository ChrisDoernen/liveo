import { InversifyExpressServer } from "inversify-express-utils";
import { Logger } from "../logging/logger";
import { ServiceConfig } from "../../config/service.config";
import { injectable, inject } from "inversify";
import * as bodyParser from "body-parser";
import "../../controller/home.controller";
import "../../controller/shutdown.controller";
import "../../controller/stream.controller";
import "../../controller/session.controller";
import "../../controller/activation.controller";
import "../../controller/activity.controller";

@injectable()
export class WebServer {
  constructor(@inject("Logger") private _logger: Logger) { }

  public initializeAndListen(container: any): any {
    const expressServer = new InversifyExpressServer(container);

    expressServer.setConfig(app => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use((req, res, next) => {
        this._logger.debug(`${req.method} request on ${req.url}.`);
        next();
      });
      app.use((err, req, res, next) => {
        this._logger.error(`${req.method} request on ${req.url} - ${err}.`);
        next();
      });

      app.enable("trust proxy");
    });

    const server = expressServer.build().listen(ServiceConfig.port);
    this._logger.info(`Web server started, listening on port ${ServiceConfig.port}.`);

    return server;
  }
}
