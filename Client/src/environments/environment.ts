import { versions } from "./versions";

export const environment = {
  name: "dev",
  production: false,
  protocol: "http",
  ip: "192.168.178.57",
  port: 3000,
  revision: versions.revision,
  version: versions.version
};
