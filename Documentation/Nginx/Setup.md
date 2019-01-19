# Nginx setup

Nginx is a high performance web server and reverse proxy. 
Additionally there is a module existing which offers video live streaming functionality like [this nginx rtmp module fork](https://github.com/ut0mt8/nginx-rtmp-module/).

The idea is to use nginx on linux as the web server for client and backend and as reverse proxy for the service. The nginx rtmp module can be used to support video streaming over mpeg dash like described in [this post](https://isrv.pw/html5-live-streaming-with-mpeg-dash).


## Nginx configuration

The configuration can be split up into multiple configs per application which then can easily enabled or disabled by adding or removing symlinks.

Create the directories

```
mkdir /etc/nginx/sites-available
mkdir /etc/nginx/sites-available
```

Inklude the follwing line in the nginx config

```
include /etc/nginx/sites-enabled/*;
```

Create symlinks

```
ln -s /etc/nginx/sites-available/live-service-nginx.conf /etc/nginx/sites-enabled/live-service-nginx.conf
```

Configuration for live service: [live-service-nginx.conf](./live-service-nginx.conf).

Configuration for live client: [live-client-nginx.conf](./live-client-nginx.conf).