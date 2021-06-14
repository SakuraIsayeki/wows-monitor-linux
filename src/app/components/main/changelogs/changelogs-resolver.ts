import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChangelogResponse } from '@generated/models';
import { ChangelogService } from '@generated/services';
import { Config } from '@config/config';

@Injectable()
export class ChangelogsResolver implements Resolve<ChangelogResponse[]> {

  constructor(private changelogService: ChangelogService, private config: Config) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ChangelogResponse[]> {
    await this.config.waitTillLoaded();
    return this.changelogService.changelogList(this.config.allowBeta ? { channel: 'beta' } : null).toPromise();
  }
}
