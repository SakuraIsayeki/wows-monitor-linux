import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChangelogAppModel } from '@generated/models';
import { ChangelogService } from '@generated/services';
import { SettingsService } from '@services/settings.service';

@Injectable()
export class ChangelogsResolver implements Resolve<ChangelogAppModel[]> {

  constructor(private changelogService: ChangelogService, private settingsService: SettingsService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ChangelogAppModel[]> {
    // await this.settingsService.waitForInitialized();
    return this.changelogService.changelogList(this.settingsService.form.monitorConfig.allowBeta.value ? { channel: 'beta' } : null).toPromise();
  }
}
