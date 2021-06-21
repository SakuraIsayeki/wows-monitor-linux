import { Pipe, PipeTransform } from '@angular/core';
import { ClanSearchResult } from '@generated/models/clan-search-result';
import { ClansService } from '@generated/services';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'resolveClans'
})
export class ResolveClansPipe implements PipeTransform {

  constructor(private clansService: ClansService) {
  }

  transform(arr: number[]): Observable<ClanSearchResult[]> {
    if (!arr || arr.length === 0) {
      return of([]);
    }
    return this.clansService.clansResolveIds({ ids: arr.join(',') });
  }
}
