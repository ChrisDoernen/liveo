export class TimeService {
  public now(): number {
    return Date.now() / 1000;
  }
}