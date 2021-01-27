import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/generated/models';

const map = [{
  seasons: [6, 7, 8, 9, 10, 11, 12, 13],
  primetimes: [
    {
      primetime: [0, 1, 2, 3],
      region: Region.ASIA
    },
    {
      primetime: [4, 5, 6, 7],
      region: Region.RU
    },
    {
      primetime: [8, 9, 10, 11],
      region: Region.EU
    },
    {
      primetime: [12, 13, 14, 15],
      region: Region.NA
    }
  ]
}];

@Pipe({
  name: 'prime2Region'
})
export class Primetime2RegionPipe implements PipeTransform {

  constructor() { }

  transform(primetimeId: number, seasonId: number): Region {
    const season = map[0];
    if (season) {
      const primetime = season.primetimes.find(p => p.primetime.includes(primetimeId));
      if (primetime) {
        return primetime.region;
      }
    }
    return null;
  }
}
