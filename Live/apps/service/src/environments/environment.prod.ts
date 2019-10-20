import { version } from "../../../../version";

export const environment = {
  production: true,
  simulate: false,
  filesource: false,
  port: 3000,
  standalone: false,
  revision: version.revision,
  version: version.version,
  environment: "executable"
};
