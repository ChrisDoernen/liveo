# Audio capturing

[Ffmpeg](https://www.ffmpeg.org/) is a powerful cross-platform solution to record, convert and stream audio and video.

The live server uses ffmpeg to convert audio and video signals into streams, so a ffmpeg installation is required. On linux, ffmpeg is available in the official sources:

```
apt install ffmpeg
```

On windows, ffmpeg must be [downloaded](http://ffmpeg.org/download.html) manually and the path to the executable has to be added to the path environment variables. 

To get currently available audio devices, the following commands can be used:

```
arecord -l  // Linux
ffmpeg -list_devices true -f dshow -i dummy // Windows
```

