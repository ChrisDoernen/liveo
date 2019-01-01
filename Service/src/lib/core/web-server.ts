import { container } from "../../config/dependencies.config";
import { InversifyExpressServer } from "inversify-express-utils";
import { Logger } from "../util/logger";
import { config } from "../../config/service.config";
import * as bodyParser from "body-parser";
import "../../controller/home-controller";
import "../../controller/system-controller";
import "../../controller/stream-controller";
import "../../controller/session-controller";

export class WebServer {

    private _expressServerInstance: any;

    constructor(private logger: Logger) {
        this.initialize();
    }

    public initialize(): any {
        const expressServer = new InversifyExpressServer(container);

        expressServer.setConfig((app) => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use((req, res, next) => { this.logger.debug(`${req.method} request on ${req.url}.`); next(); });
            app.use((err, req, res, next) => { this.logger.error(`${req.method} request on ${req.url} - ${err}.`); next(); });
        });

        this._expressServerInstance = expressServer.build();

        return this._expressServerInstance;
    }

    public listen(): void {
        this._expressServerInstance.listen(config.port, () => {
            this.logger.info(`Server started, listening on port ${config.port}.`);
        });
    }
}
