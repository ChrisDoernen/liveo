import { Injectable } from "@nestjs/common";

@Injectable()
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