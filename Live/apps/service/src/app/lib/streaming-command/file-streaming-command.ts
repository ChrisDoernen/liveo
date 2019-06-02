import { ICommand } from "./i-command";

export const FileStreamingCommand: ICommand = {
  command: "ffmpeg",
  arguments: [
    "-re",
    "-i",
    "__FILENAME__",
    "-rtbufsize",
    "64",
    "-probesize",
    "64",
    "-acodec",
    "libmp3lame",
    "-ab",
    "196k",
    "-reservoir",
    "0",
    "-f",
    "mp3",
    "-fflags",
    "+nobuffer",
    "-hide_banner",
    "-"
  ]
};
