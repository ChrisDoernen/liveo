import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TimeService {
  public now(): number {
    return Date.now();
  }

  public getTimestampFromTimeString(time: string): number {
    if (!time) {
      return null;
    }

    const timeSplit = time.split(":");
    const hour = +timeSplit[0];
    const minutes = +timeSplit[1];

    const timestamp = Math.floor(new Date().setHours(hour, minutes, 0, 0) / 1000);

    return timestamp;
  }
}