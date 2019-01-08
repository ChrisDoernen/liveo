import * as appRoot from "app-root-path";

export const config = {
    port: process.env.PORT || 3000,
    environment: process.env.ENVIRONMENT || "Development",
    os: process.platform,
    arch: process.arch,
    sessions: `${appRoot}/dist/data/sessions.json`,
    streams: `${appRoot}/dist/data/streams.json`,
    autostart: `${appRoot}/dist/data/autostart.json`
};
