import { version } from "../../../../version";

export const environment = {
  production: false,
  simulate: true,
  port: 3000,
  standalone: true,
  executable: false,
  revision: version.revision,
  version: version.version
};
