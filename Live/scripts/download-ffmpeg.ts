const decompressTarxz = require("decompress-tarxz");
const decompressUnzip = require("decompress-unzip");
import * as download from "download";
import { lstatSync, PathLike, readdirSync } from "fs";
import { join } from "path";
const ncp = require("ncp").ncp;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const ffmpegDownloadLinks = [
  "https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-20200213-6d37ca8-win64-static.zip",
  "https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz"
];

const ffmpegStaticFiles = [
  {
    searchString: "win64",
    subDirectory: "bin",
    fileName: "ffmpeg.exe"
  },
  {
    searchString: "amd64",
    subDirectory: "",
    fileName: "ffmpeg"
  }
]

const downloadDirectory = "downloads";

const options: download.DownloadOptions = {
  extract: true,
  plugins: [
    decompressTarxz(),
    decompressUnzip()
  ]
}

const downloadFfmpeg = async () => {
  await asyncForEach(ffmpegDownloadLinks, async (link: string) => {
    await download(link, downloadDirectory, options);
    console.log(`Download and extration of ${link} to ${downloadDirectory} successful.`);
  });
}

const copyStaticFiles = () => {
  const isDirectory = (source: PathLike) => lstatSync(source).isDirectory();
  const downloadsDirectoryAbsolute = join(__dirname, "..", downloadDirectory);
  const directories = readdirSync(downloadsDirectoryAbsolute).map(name => join(downloadDirectory, name)).filter(isDirectory);

  directories.forEach((directory) => {
    ffmpegStaticFiles.forEach((file) => {
      if (directory.includes(file.searchString)) {
        const source = join(directory, file.subDirectory, file.fileName);
        const destination = join(downloadDirectory, file.fileName);

        ncp(source, destination, (error: any) => {
          if (error) {
            console.error(`Error while copying file ${source} to ${destination}: ${error}`);
          }
        });
      }
    })
  })
}

downloadFfmpeg()
  .then(() => copyStaticFiles())
  .then(() => console.log("Downloading ffmpeg static files succeeded"))
  .catch((error) => console.error(`Error while downloading, extracting and copying ffmpeg: ${error}`));