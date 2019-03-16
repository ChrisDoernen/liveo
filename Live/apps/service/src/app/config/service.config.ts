import * as appRoot from 'app-root-path';

export const ServiceConfig = {
  os: process.platform,
  arch: process.arch,
  port: process.env.PORT ? +process.env.PORT : 3000,
  development: process.env.DEVELOPMENT
    ? process.env.DEVELOPMENT.toLowerCase() === 'true'
    : true,
  simulate: process.env.SIMULATE
    ? process.env.SIMULATE.toLowerCase() === 'true'
    : true,
  sessions: `${appRoot}/dist/apps/service/assets/data/sessions.json`,
  streams: `${appRoot}/dist/apps/service/assets/data/streams.json`,
  autostart: `${appRoot}/dist/apps/service/assets/data/autostart.json`,
  logfilename: `${appRoot}/dist/apps/service/logs/live-service.log`,
  ffmpeglogfilename: `${appRoot}/dist/apps/service/logs/live-ffmpeg.log`
};
