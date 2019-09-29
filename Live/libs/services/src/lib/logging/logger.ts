import { Injectable, InjectionToken, Inject } from "@angular/core";

export const ENABLECONSOLELOGGING = new InjectionToken<string>("ENABLECONSOLELOGGING");

const noop = (message: string) => undefined;

@Injectable({
  providedIn: "root"
})
export class Logger {

  constructor(
    @Inject(ENABLECONSOLELOGGING) private _enableConsoleLogging: boolean = false) {
  }

  get info(): (message: string) => void {
    if (this._enableConsoleLogging) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn(): (message: string) => void {
    if (this._enableConsoleLogging) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error(): (message: string) => void {
    if (this._enableConsoleLogging) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }
}