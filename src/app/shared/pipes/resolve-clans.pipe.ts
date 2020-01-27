import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Pipe({
  name: 'resolveClans'
})
export class ResolveClansPipe implements PipeTransform {

  constructor(private apiService: ApiService) { }

  transform(arr: number[]): Observable<any[]> {
    return this.apiService.clansResolveIds(arr);
  }
}
