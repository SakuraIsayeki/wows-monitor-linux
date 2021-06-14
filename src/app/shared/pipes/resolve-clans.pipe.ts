import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClansService } from '@generated/services';

@Pipe({
  name: 'resolveClans'
})
export class ResolveClansPipe implements PipeTransform {

  constructor(private clansService: ClansService) { }

  transform(arr: number[]): Observable<any[]> {
    if (!arr || arr.length === 0) {
      return of([]);
    }
    return this.clansService.clansResolveIds({ ids: arr.join(',') });
  }
}
