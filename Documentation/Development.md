# Development Documentation


## Audio capturing

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

## Video capturing

To get currently available video devices, the following command can be used:
```
ls -ltrh /dev/video*
```

## Nginx

Nginx is a high performance web server and reverse proxy. 
Additionally there is a module existing which offers video live streaming functionality like [this nginx rtmp module fork](https://github.com/ut0mt8/nginx-rtmp-module/).

The idea is to use nginx on linux as the web server for client and backend and as reverse proxy for the service. The nginx rtmp module can be used to support video streaming over mpeg dash like described in [this post](https://isrv.pw/html5-live-streaming-with-mpeg-dash).

### Nginx configuration

The configuration can be split up into multiple configs per application which then can easily enabled or disabled by adding or removing symlinks.

Create the directories for http and rtmp server configs:

```
mkdir /etc/nginx/sites-available/http
mkdir /etc/nginx/sites-available/http
mkdir /etc/nginx/sites-available/rtmp
mkdir /etc/nginx/sites-available/rtmp
```

Include the follwing line in the respective sections in nginx.conf:

```
include /etc/nginx/sites-enabled/http/*;
include /etc/nginx/sites-enabled/rtmp/*;
```

Create symlinks (example):

```
ln -s /etc/nginx/sites-available/http/live-service.conf /etc/nginx/sites-enabled/http/live-service.conf
```

## Api testing with Postman

[Postman](https://www.getpostman.com/) can be used for api testing. See the corresponding postman collection.

## Starting service as a daemon

The server can be configured to be run on startup in the backgound as a daemon. Systemd can help with that on linux. The place for the service config is `/etc/systemd/system`. Helpful commands are:

```
sudo systemctl daemon-reload
sudo systemctl start live
sudo systemctl stop live
sudo systemctl status live
```
