import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProfileAppModel } from '@generated/models';
import { ProfileService } from '@generated/services/profile.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileResolver implements Resolve<ProfileAppModel> {

  constructor(private service: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileAppModel> {
    return this.service.profileGet();
  }
}
