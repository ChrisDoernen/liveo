import * as appRoot from 'app-root-path';
import { environment } from '../../environments/environment';

export const ServiceConfig = {
  os: process.platform,
  arch: process.arch,
  port: environment.port,
  production: environment.production,
  simulate: environment.simulate,
  sessions: `${appRoot}/dist/apps/service/assets/data/sessions.json`,
  streams: `${appRoot}/dist/apps/service/assets/data/streams.json`,
  autostart: `${appRoot}/dist/apps/service/assets/data/autostart.json`,
  logfilename: `${appRoot}/dist/apps/service/logs/live-service.log`,
  ffmpeglogfilename: `${appRoot}/dist/apps/service/logs/live-ffmpeg.log`
};
