import { environment } from "../../environments/environment";
import * as ffmpeg from "ffmpeg-static";

const workingDirectory = process.env.EXECUTABLE ? process.cwd() : __dirname;

export const config = {
  os: process.platform,
  arch: process.arch,
  port: process.env.PORT ? process.env.PORT : environment.port,
  production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
  simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
  filesource: process.env.FILESOURCE ? process.env.FILESOURCE === "true" : environment.filesource,
  standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
  executable: process.env.EXECUTABLE ? process.env.EXECUTABLE === "true" : environment.executable,
  database: process.env.DBFILE ? process.env.DBFILE : `${workingDirectory}/data/db.json`,
  logfilename: process.env.LOGFILE ? process.env.LOGFILE : `${workingDirectory}/logs/live-service.log`,
  ffmpeglogfilename: process.env.FFMPEGLOGFILE ? process.env.FFMPEGLOGFILE : `${workingDirectory}/logs/live-ffmpeg.log`,
  ffmpegPath: process.env.FFMPEGPATH ? process.env.FFMPEGPATH : ffmpeg.path
};
