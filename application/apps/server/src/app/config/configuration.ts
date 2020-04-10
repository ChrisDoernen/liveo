import { existsSync } from "fs";
import path, { join } from "path";
import { environment } from "../../environments/environment";
import { AppConfig } from "./app-config";

export const configuration = () => {
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

  const platform = process.platform;
  const architecture = process.arch;
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

  const appConfig: AppConfig = {
    platform: platform,
    architecture: architecture,
    port: process.env.PORT ? process.env.PORT : environment.port.toString(),
    production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
    simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
    standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
    executable: process.env.EXECUTABLE ? process.env.EXECUTABLE === "true" : environment.executable,
    database: process.env.DATABASE ? process.env.DATABASE : `${workingDirectory}/database/db.json`,
    loglevel: process.env.LOGLEVEL ? process.env.LOGLEVEL : "debug",
    logdirectory: process.env.LOGDIRECTORY ? process.env.LOGDIRECTORY : path.join(workingDirectory, "logs"),
    ffmpegPath: process.env.FFMPEGPATH ? process.env.FFMPEGPATH : findFfmpegPath(),
    staticFilesBaseDirectory,
    workingDirectory
  }

  return {
    appConfig
  };
}
