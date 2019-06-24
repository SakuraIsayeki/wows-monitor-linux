import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchGroup'
})
export class MatchGroupPipe implements PipeTransform {

  transform(matchGroup: string): string {
    return 'monitor.matchGroup.' + matchGroup;
  }
}
