export const ffmpeg = {
    command: "ffmpeg",
    arguments: [
        "-y",
        "-f",
        "alsa",
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
        "-ac",
        "1",
        "-reservoir",
        "0",
        "-f",
        "mp3",
        "-fflags",
        "+nobuffer",
        "-"
    ]
};
