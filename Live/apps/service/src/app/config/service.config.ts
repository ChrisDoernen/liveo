import { environment } from "../../environments/environment";

// This secion is copied from ffmpeg-static npm package
// We dont want do have that dependency as pkg will include the binaries
// of all OSes and bloat the bundle.
var os = require("os")
var path = require("path")

var platform = os.platform()
if (platform !== "linux" && platform !== "darwin" && platform !== "win32") {
  console.error("Unsupported platform.")
  process.exit(1)
}

var arch = os.arch()
if (platform === "darwin" && arch !== "x64") {
  console.error("Unsupported architecture.")
  process.exit(1)
}

var ffmpegPath = path.join(
  "node_modules",
  "ffmpeg-static",
  "bin",
  platform,
  arch,
  platform === "win32" ? "ffmpeg.exe" : "ffmpeg"
)

const workingDirectory = process.env.EXECUTABLE ? process.cwd() : __dirname;
const ffmpegExePath = process.env.EXECUTABLE ? path.join(process.cwd(), "ffmpeg/ffmpeg.exe") : ffmpegPath;

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
  ffmpegPath: process.env.FFMPEGPATH ? process.env.FFMPEGPATH : ffmpegExePath
};
