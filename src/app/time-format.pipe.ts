import { Pipe, PipeTransform } from '@angular/core';
import {min} from "rxjs";

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);

    const minutesStr: string = minutes.toString();
    const secondsStr: string = seconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
  }

}
