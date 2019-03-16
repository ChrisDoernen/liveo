import { version } from "../../../../version";

export const environment = {
  name: "production",
  production: true,
  protocol: "http",
  ip: "localhost",
  port: 8080,
  revision: version.revision,
  version: version.version
};