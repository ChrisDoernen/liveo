import * as appRoot from "app-root-path";

export const ServiceConfig = {
  os: process.platform,
  arch: process.arch,
  port: process.env.PORT ? +process.env.PORT : 3000,
  development: process.env.DEVELOPMENT ? process.env.DEVELOPMENT.toLowerCase() == "true" : true,
  simulate: process.env.SIMULATE ? process.env.SIMULATE.toLowerCase() == "true" : true,
  sessions: `${appRoot}/dist/data/sessions.json`,
  streams: `${appRoot}/dist/data/streams.json`,
  autostart: `${appRoot}/dist/data/autostart.json`
};
