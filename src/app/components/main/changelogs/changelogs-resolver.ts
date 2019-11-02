import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Changelog } from 'src/app/interfaces/changelog';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';

@Injectable()
export class ChangelogsResolver implements Resolve<Changelog[]> {

  constructor(private apiService: ApiService, private config: Config) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Changelog[]> {
    await this.config.waitTillLoaded();
    return this.apiService.changelogList().toPromise();
  }
}
