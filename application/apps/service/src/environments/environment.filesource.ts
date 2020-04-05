import { version } from "../../../../version";

export const environment = {
  production: false,
  simulate: false,
  filesource: true,
  port: 3000,
  standalone: true,
  executable: false,
  revision: version.revision,
  version: version.version,
  environment: "executable"
};