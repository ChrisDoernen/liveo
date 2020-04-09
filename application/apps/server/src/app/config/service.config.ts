// Path has to be required, otherwise Jest can not cope
const path = require("path");
import { existsSync } from "fs";
import { join } from "path";
import { environment } from "../../environments/environment";

const platform = process.platform;
if (platform !== "linux" && platform !== "win32") {
  console.error(`Unsupported platform: ${platform}`);
  process.exit(1)
}

const architecture = process.arch;
if (architecture !== "x64") {
  console.error(`Unsupported architecture: ${architecture}`);
  process.exit(1)
}

const workingDirectory = process.env.EXECUTABLE ? process.cwd() : __dirname;
const staticFilesBaseDirectory = process.env.EXECUTABLE ? process.cwd() : path.resolve(__dirname, "..");

// FFmpeg paths to look at for environment and platform
const ffmpegPaths = {
  win32: [
    "ffmpeg/ffmpeg.exe",
    "ffmpeg/win-x64/ffmpeg.exe",
    "../../../ffmpeg/win-x64/ffmpeg.exe"
  ],
  linux: [
    "ffmpeg/ffmpeg",
    "ffmpeg/linux-x64/ffmpeg",
    "../../../ffmpeg/linux-x64/ffmpeg"
  ],
  fallback: "ffmpeg"
};

const findFfmpegPath = () => {
  for (let index = 0; index < ffmpegPaths[platform].length; index++) {
    const currentRelativePath = ffmpegPaths[platform][index];
    const currentAbsolutePath = join(workingDirectory, currentRelativePath);
    if (existsSync(currentAbsolutePath)) {
      return currentAbsolutePath;
    }
  }

  return ffmpegPaths.fallback;
};

export const config = {
  platform: platform,
  arch: architecture,
  port: process.env.PORT ? process.env.PORT : environment.port,
  production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
  simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
  filesource: process.env.FILESOURCE ? process.env.FILESOURCE === "true" : environment.filesource,
  standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
  executable: process.env.EXECUTABLE ? process.env.EXECUTABLE === "true" : environment.executable,
  database: process.env.DATABASE ? process.env.DATABASE : `${workingDirectory}/data/db.json`,
  loglevel: process.env.LOGLEVEL ? process.env.LOGLEVEL : "debug",
  logdirectory: process.env.LOGDIRECTORY ? process.env.LOGDIRECTORY : path.join(workingDirectory, "logs"),
  ffmpegPath: process.env.FFMPEGPATH ? process.env.FFMPEGPATH : findFfmpegPath(),
  staticFilesBaseDirectory,
  workingDirectory
};
