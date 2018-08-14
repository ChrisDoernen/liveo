import { Injectable } from '@angular/core';

function _window(): any {
  // Global native browser window object
  return _window;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private get config(): any {
    return _window().__env;
  }

  public get apiServer(): string {
    return this.config.configuration.apiServer;
  }
}
