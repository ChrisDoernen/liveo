import { version } from '../../../../version';

export const environment = {
  name: 'production',
  production: true,
  revision: version.revision,
  version: version.version
};
