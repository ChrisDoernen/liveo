// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { version } from "../../../../version";

export const environment = {
  production: false,
  simulate: false,
  filesource: false,
  port: 3000,
  standalone: true,
  executable: false,
  revision: version.revision,
  version: version.version
};
