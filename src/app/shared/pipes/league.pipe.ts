import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/interfaces/region';

@Pipe({
  name: 'league'
})
export class LeaguePipe implements PipeTransform {
  transform(league: number): string {
    return '';
  }
}
