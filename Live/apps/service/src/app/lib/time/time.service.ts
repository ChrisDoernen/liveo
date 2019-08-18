import { injectable } from "inversify";

@injectable()
export class TimeService {
  public now(): Date {
    return new Date();
  }

  public getTimestampFromISODate(date: string): number {
    return new Date(date).getTime();
  }

  public getISODateFromTimestamp(timestamp: number): string {
    return new Date(timestamp).toISOString();
  }
}