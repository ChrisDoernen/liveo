import { container } from "../../config/dependencies.config";
import { InversifyExpressServer } from "inversify-express-utils";
import { Logger } from "../util/logger";
import { config } from "../../config/service.config";
import { injectable, inject } from "inversify";
import * as bodyParser from "body-parser";
import "../../controller/home-controller";
import "../../controller/system-controller";
import "../../controller/stream-controller";
import "../../controller/session-controller";

@injectable()
export class WebServer {

    private _expressServerInstance: any;

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public initialize(): any {
        const expressServer = new InversifyExpressServer(container);

        expressServer.setConfig((app) => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use((req, res, next) => { this._logger.debug(`${req.method} request on ${req.url}.`); next(); });
            app.use((err, req, res, next) => { this._logger.error(`${req.method} request on ${req.url} - ${err}.`); next(); });
        });

        this._expressServerInstance = expressServer.build();

        return expressServer;
    }

    public listen(): void {
        this._expressServerInstance.listen(config.port, () => {
            this._logger.info(`Server started, listening on port ${config.port}.`);
        });
    }
}
