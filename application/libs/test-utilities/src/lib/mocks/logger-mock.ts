const noop = (message: string) => undefined;

export class LoggerMock {
  get info(): (message: string) => void {
    return noop;
  }

  get warn(): (message: string) => void {
    return noop;
  }

  get error(): (message: string) => void {
    return noop;
  }
}