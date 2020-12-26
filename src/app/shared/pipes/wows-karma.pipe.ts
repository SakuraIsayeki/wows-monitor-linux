import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/generated/models';

@Pipe({
  name: 'wowsKarma'
})
export class WowsKarmaPipe implements PipeTransform {

  private static pipe = new WowsKarmaPipe();

  static staticTransform(region: Region) {
    return this.pipe.transform(region);
  }

  transform(region: Region): string {
    switch (region) {
      case Region.EU:
        return 'https://wows-karma.com/';
      case Region.NA:
        return 'https://na.wows-karma.com/';
      case Region.RU:
        return 'https://ru.wows-karma.com/';
      case Region.ASIA:
        return 'https://asia.wows-karma.com/';
    }
  }
}
