# Knowledge Base

## Ffmpeg

[Ffmpeg](https://www.ffmpeg.org/) is a powerful cross-platform solution to record, convert and stream audio and video.

The live server uses ffmpeg to convert audio and video signals into streams, so a ffmpeg installation is required. On linux, ffmpeg is available in the official sources:

```
apt install ffmpeg
```

On windows, ffmpeg must be [downloaded](http://ffmpeg.org/download.html) manually and the path to the executable has to be added to the path environment variables. 

To get currently available audio devices, the following commands can be used:

```
arecord -L  // Linux
ffmpeg -list_devices true -f dshow -i dummy // Windows
```

To get currently available video devices, the following command can be used:
```
ls -ltrh /dev/video*
```

## Nginx

Nginx is a high performance web server and reverse proxy. 
Additionally there is a module existing which offers video live streaming functionality like [this nginx rtmp module fork](https://github.com/ut0mt8/nginx-rtmp-module/).

The idea is to use nginx on linux as the web server for client and backend and as reverse proxy for the service. The nginx rtmp module can be used to support video streaming over mpeg dash like described in [this post](https://isrv.pw/html5-live-streaming-with-mpeg-dash).

The configuration can be split up into multiple configs per application which then can easily enabled or disabled by adding or removing symlinks.
The directory for the configs are `/etc/nginx/sites-available` and `mkdir /etc/nginx/sites-enabled`.

Include the follwing line in the respective sections in nginx.conf: `include /etc/nginx/sites-enabled/*;`

Create symlinks (example):

```
ln -s /etc/nginx/sites-available/live.conf /etc/nginx/sites-enabled/live.conf
```

## Systemd

The server can be configured to be run on startup in the backgound as a daemon. Systemd can help with that on linux. The place for the service config is `/etc/systemd/system`. Helpful commands are:

```
sudo systemctl daemon-reload
sudo systemctl start live
sudo systemctl stop live
sudo systemctl status live
```
Please note that the shutdown function only works if the user which is running the service has the rights to execute the shutdown command, e.g. with `chris ALL=NOPASSWD: /sbin/shutdown, /sbin/reboot` in `/etc/sudoers`.


## Alsa and Pulseaudio

Alsa does not give sound devices the same card id on system boot. To prevent this, we can add a .rules file to `/etc/udev/rules.d/`, e.g. `70-alsa-permanent.rules`. It contains a papping between usb port path and sound device id's. To find the usb port path, we can run the command `udevadm monitor --kernel --subsystem-match=sound` and plug in the soud device. The corresponding path will be given in the "change" entry of the output. The device id can be an arbitrary string (most special characters are not allowed). Audio USB devices plugged in at any USB port mapped in this file can be used in the app.

Occasionally the error "device or resouce busy" was thrown when trying to start streaming after system boot. Deleting pulseaudio resoved this issue.