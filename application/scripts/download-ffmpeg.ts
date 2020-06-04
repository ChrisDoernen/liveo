// tslint:disable: no-shadowed-variable
const decompressTarxz = require("decompress-tarxz");
const decompressUnzip = require("decompress-unzip");
import * as download from "download";
import { lstatSync, PathLike, readdirSync } from "fs";
import { copySync, emptyDir, ensureDir, remove } from "fs-extra";
import { basename, join } from "path";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}

declare interface IFfmpegDownload {
  platform: string;
  destination: string;
  link: string;
  searchString: string;
  files: string[];
}

const ffmpegDownloads: IFfmpegDownload[] = [
  {
    platform: "win32",
    destination: "win-x64",
    link: "https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-20200213-6d37ca8-win64-static.zip",
    searchString: "win64",
    files: [
      "bin/ffmpeg.exe",
      "LICENSE.txt"
    ]
  },
  {
    platform: "linux",
    destination: "linux-x64",
    link: "https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz",
    searchString: "amd64",
    files: [
      "ffmpeg",
      "GPLv3.txt"
    ]
  }
];

const downloadDirectory = "ffmpeg";

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

  console.log(`Downloading Ffmpeg for platform ${platform}...`);
  return downloads;
}

const downloadFfmpeg = async () => {
  const downloads = getDownloads();
  await asyncForEach(downloads, async (ffmpegDownload: IFfmpegDownload) => {
    await download(ffmpegDownload.link, downloadDirectory, options);
    console.log(`Download and extraction of ${ffmpegDownload.link} to ${downloadDirectory} successful.`);
  });
}

const cleanDownloadDirectory = () => {
  emptyDir(downloadDirectory);
}

const copyStaticFilesAndCleanUp = async () => {
  const isDirectory = (source: PathLike) => lstatSync(source).isDirectory();
  const downloadsDirectoryAbsolute = join(__dirname, "..", downloadDirectory);
  const directories = readdirSync(downloadsDirectoryAbsolute).map(name => join(downloadDirectory, name)).filter(isDirectory);

  for (let directoriesIndex = 0; directoriesIndex < directories.length; directoriesIndex++) {
    const directory = directories[directoriesIndex];
    for (let downloadsIndex = 0; downloadsIndex < ffmpegDownloads.length; downloadsIndex++) {
      const download = ffmpegDownloads[downloadsIndex];
      if (directory.includes(download.searchString)) {
        const plattFormPath = join(downloadDirectory, download.destination);
        ensureDir(plattFormPath);

        for (let fileIndex = 0; fileIndex < download.files.length; fileIndex++) {
          const file = download.files[fileIndex];
          const source = join(directory, file);
          const destination = join(plattFormPath, basename(file));

          copySync(source, destination);
        }

        console.log(`Deleting temporary directory ${directory}`);
        remove(directory);
      }
    }
  }
}

cleanDownloadDirectory();
downloadFfmpeg()
  .then(() => copyStaticFilesAndCleanUp())
  .then(() => console.log("Downloading ffmpeg static files succeeded."))
  .catch((error) => {
    console.error(`Error while downloading, extracting and copying ffmpeg: ${error}`);
    process.exit(1);
  });
