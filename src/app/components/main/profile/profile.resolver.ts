import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProfileEdit } from '@generated/models/profile-edit';
import { ProfileService } from '@generated/services/profile.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileResolver implements Resolve<ProfileEdit> {

  constructor(private service: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileEdit> {
    return this.service.profileGet();
  }
}
