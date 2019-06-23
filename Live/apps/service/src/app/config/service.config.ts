import * as appRoot from "app-root-path";
import { environment } from "../../environments/environment";

export const config = {
  os: process.platform,
  arch: process.arch,
  port: process.env.PORT ? process.env.PORT : environment.port,
  production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
  simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
  filesource: process.env.FILESOURCE ? process.env.FILESOURCE === "true" : environment.filesource,
  standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
  database: `${appRoot}/dist/apps/service/assets/data/db.json`,
  logfilename: `${appRoot}/dist/apps/service/logs/live-service.log`,
  ffmpeglogfilename: `${appRoot}/dist/apps/service/logs/live-ffmpeg.log`
};
