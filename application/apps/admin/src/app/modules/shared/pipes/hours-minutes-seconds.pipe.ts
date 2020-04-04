import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "HoursMinutesSeconds"
})
export class HoursMinutesSecondsPipe implements PipeTransform {

  public transform(value: number): string {
    const temp = value / 1000;
    const hoursNum = Math.floor(temp / 3600);
    const hours = this.prefixZeroIfNecessary(hoursNum);

    const minutesNum = Math.floor((temp / 60) % 60);
    const minutes = this.prefixZeroIfNecessary(minutesNum);

    const secondsNum = Math.floor(temp % 3600 % 60);
    const seconds = this.prefixZeroIfNecessary(secondsNum);

    return hours + ":" + minutes + ":" + seconds;
  }

  private prefixZeroIfNecessary(value: number): string {
    let valueString = value.toString();
    if (valueString.toString().length === 1) {
      valueString = "0" + value;
    }

    return valueString;
  }
}