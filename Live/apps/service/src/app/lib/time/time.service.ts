import { injectable } from "inversify";

@injectable()
export class TimeService {
  public now(): number {
    return Date.now();
  }
}