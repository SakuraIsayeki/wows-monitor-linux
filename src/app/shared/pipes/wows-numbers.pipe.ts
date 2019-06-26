import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/interfaces/region';

@Pipe({
  name: 'wowsNumbers'
})
export class WowsNumbersPipe implements PipeTransform {

  private static pipe = new WowsNumbersPipe();

  static staticTransform(region: Region) {
    this.pipe.transform(region);
  }

  transform(region: Region): string {
    switch (region) {
      case Region.EU:
        return 'https://wows-numbers.com/';
      case Region.NA:
        return 'https://na.wows-numbers.com/';
      case Region.RU:
        return 'https://ru.wows-numbers.com/';
      case Region.ASIA:
        return 'https://asia.wows-numbers.com/';
    }
  }
}
