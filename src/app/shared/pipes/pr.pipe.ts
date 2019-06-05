import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pr'
})
export class PrPipe implements PipeTransform {

  private static pipe = new PrPipe();

  public static staticTransform(pr: number) {
    return this.pipe.transform(pr);
  }

  transform(pr: number): string {
    if (pr <= 750) {
      return '#FE0E00';
    } else if (pr <= 1100) {
      return '#FE7903';
    } else if (pr <= 1350) {
      return '#FFC71F';
    } else if (pr <= 1550) {
      return '#44B300';
    } else if (pr <= 1750) {
      return '#318000';
    } else if (pr <= 2100) {
      return '#02C9B3';
    } else if (pr <= 2450) {
      return '#D042F3';
    } else {
      return '#A00DC5';
    }
  }
}
