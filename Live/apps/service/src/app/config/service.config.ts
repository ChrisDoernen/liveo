// Path has to be required, otherwise Jest can not cope
const path = require("path");
import { environment } from "../../environments/environment";

const platform = process.platform;
if (platform !== "linux" && platform !== "darwin" && platform !== "win32") {
  console.error("Unsupported platform.")
  process.exit(1)
}

const architecture = process.arch;
if (platform === "darwin" && architecture !== "x64") {
  console.error("Unsupported architecture.")
  process.exit(1)
}

const workingDirectory = process.env.EXECUTABLE ? process.cwd() : __dirname;

export const config = {
  os: platform,
  arch: architecture,
  port: process.env.PORT ? process.env.PORT : environment.port,
  production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
  simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
  filesource: process.env.FILESOURCE ? process.env.FILESOURCE === "true" : environment.filesource,
  standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
  executable: process.env.EXECUTABLE ? process.env.EXECUTABLE === "true" : environment.executable,
  database: process.env.DBFILE ? process.env.DBFILE : `${workingDirectory}/data/db.json`,
  loglevel: process.env.LOGLEVEL ? process.env.LOGLEVEL : "debug",
  logdirectory: process.env.LOGDIRECTORY ? process.env.LOGDIRECTORY : path.join(workingDirectory, "logs"),
  ffmpegPath: process.env.FFMPEGPATH ? process.env.FFMPEGPATH : "ffmpeg",
  workingDirectory
};
