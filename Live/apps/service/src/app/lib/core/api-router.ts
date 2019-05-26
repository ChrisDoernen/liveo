import * as express from "express";
import * as bodyParser from "body-parser";
export var api = express.Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use((req, res, next) => {
  // this._logger.debug(`${req.method} request on ${req.url}.`);
  next();
});
api.use((err, req, res, next) => {
  // this._logger.error(`${req.method} request on ${req.url} - ${err}.`);
  next();
});