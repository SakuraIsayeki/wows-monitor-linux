import { Pipe, PipeTransform } from '@angular/core';
import { Region } from 'src/app/generated/models';

@Pipe({
  name: 'region'
})
export class RegionPipe implements PipeTransform {
  transform(region: number): string {
    return Region[region];
  }
}
