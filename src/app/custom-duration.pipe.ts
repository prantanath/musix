import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDuration',
  standalone: true
})
export class CustomDurationPipe implements PipeTransform {

  transform(value: number): string {
    let minute = Math.floor(value/60);
    let second = value%60;
    return `${minute}:${second} min`;
  }

}
