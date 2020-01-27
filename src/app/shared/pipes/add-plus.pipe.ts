import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addPlus'
})
export class AddPlusPipe implements PipeTransform {

  transform(num: number): string {
    if (!num) {
      return '';
    }
    return num > 0 ? '+' + num : num.toString();
  }
}
