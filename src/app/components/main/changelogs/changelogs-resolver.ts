import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChangelogResponse } from '@generated/models';
import { ChangelogService } from '@generated/services';
import { SettingsService } from '@services/settings.service';

@Injectable()
export class ChangelogsResolver implements Resolve<ChangelogResponse[]> {

  constructor(private changelogService: ChangelogService, private settingsService: SettingsService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ChangelogResponse[]> {
    await this.settingsService.waitForInitialized();
    return this.changelogService.changelogList(this.settingsService.form.monitorConfig.allowBeta.value ? { channel: 'beta' } : null).toPromise();
  }
}
