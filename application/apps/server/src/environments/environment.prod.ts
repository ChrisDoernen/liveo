import { version } from "../../../../version";

export const environment = {
  production: true,
  simulate: false,
  port: 80,
  standalone: true,
  executable: true,
  revision: version.revision,
  version: version.version
};
