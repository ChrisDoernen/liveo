export const FfmpegConfig = {
  command: "ffmpeg",
  arguments: [
    "-y",
    "-f",
    "alsa",
    // "-ac",
    // "1",
    "-i",
    "hw:__deviceId__",
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
