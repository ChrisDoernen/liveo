import { versions } from "./versions";

export const environment = {
  name: "production",
  production: true,
  protocol: "http",
  ip: "localhost",
  port: 8080,
  revision: versions.revision,
  version: versions.version
};
