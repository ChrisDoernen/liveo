// tslint:disable: no-shadowed-variable
const decompressTarxz = require("decompress-tarxz");
const decompressUnzip = require("decompress-unzip");
import * as download from "download";
import { existsSync, lstatSync, mkdirSync, PathLike, readdirSync } from "fs";
import { basename, join } from "path";
const ncp = require("ncp").ncp;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

declare interface IFfmpegDownload {
  platform: string;
  link: string;
  searchString: string;
  files: string[];
}

const ffmpegDownloads: IFfmpegDownload[] = [
  {
    platform: "win32",
    link: "https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-20200213-6d37ca8-win64-static.zip",
    searchString: "win64",
    files: [
      "bin/ffmpeg.exe",
      "LICENSE.txt"
    ]
  },
  {
    platform: "linux",
    link: "https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz",
    searchString: "amd64",
    files: [
      "ffmpeg",
      "GPLv3.txt"
    ]
  }
];

const downloadDirectory = "ffmpeg-downloads";

const options: download.DownloadOptions = {
  extract: true,
  plugins: [
    decompressTarxz(),
    decompressUnzip()
  ]
}

const getDownloads: () => IFfmpegDownload[] = () => {
  const argument = process.argv[2];
  const platform = process.platform;

  if (argument === "--ci") {
    console.log("Downloading Ffmpeg in CI environment");
    return ffmpegDownloads;
  } else if (!!argument) {
    console.error("Bad argument for CI switch. Use '--ci' to download ffmpeg for all platforms.");
    process.exit(1);
  }

  const downloads = ffmpegDownloads.filter((ffmpegDownload) => ffmpegDownload.platform === platform);

  if (downloads.length === 0) {
    console.error(`Platform ${platform} is not supported`);
    process.exit(1);
  }

  console.log(`Downloading Ffmpeg for platform ${platform}`);
  return downloads;
}

const downloadFfmpeg = async () => {
  const downloads = getDownloads();
  await asyncForEach(downloads, async (ffmpegDownload: IFfmpegDownload) => {
    await download(ffmpegDownload.link, downloadDirectory, options);
    console.log(`Download and extraction of ${ffmpegDownload.link} to ${downloadDirectory} successful.`);
  });
}

const copyStaticFiles = () => {
  const isDirectory = (source: PathLike) => lstatSync(source).isDirectory();
  const downloadsDirectoryAbsolute = join(__dirname, "..", downloadDirectory);
  const directories = readdirSync(downloadsDirectoryAbsolute).map(name => join(downloadDirectory, name)).filter(isDirectory);

  directories.forEach((directory) => {
    ffmpegDownloads.forEach((download) => {
      if (directory.includes(download.searchString)) {
        const plattFormPath = join(downloadDirectory, download.platform);
        if (!existsSync(plattFormPath)) {
          mkdirSync(plattFormPath);
        }

        download.files.forEach((file) => {
          const source = join(directory, file);
          const destination = join(plattFormPath, basename(file));

          ncp(source, destination, (error: any) => {
            if (error) {
              console.error(`Error while copying file ${source} to ${destination}: ${error}`);
            }
          });
        });
      }
    });
  });
}

downloadFfmpeg()
  .then(() => copyStaticFiles())
  .then(() => console.log("Downloading ffmpeg static files succeeded"))
  .catch((error) => {
    console.error(`Error while downloading, extracting and copying ffmpeg: ${error}`);
    process.exit(1);
  });
