import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { ProfileAppModel } from '@generated/models';
import { Region } from '@generated/models/region';
import { ProfileService } from '@generated/services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '@services/jwt-auth.service';
import { AUTHSERVICETOKEN, DynamicDialogService } from '@stewie/framework';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent implements OnInit {

  profile = this.route.data.pipe(this.untilDestroy(), map(data => data.profile as ProfileAppModel));
  selectingRegion: boolean;

  constructor(private route: ActivatedRoute,
              private renderer: Renderer2,
              private profileService: ProfileService,
              private translate: TranslateService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
              private dynamicDialog: DynamicDialogService) {
    super();
  }

  ngOnInit(): void {
  }

  setPublic(accountId: number, value: boolean) {
    this.profileService.profileSetPublic({ accountId, value }).subscribe(() => {
      this.uiSuccess('profileSaved');
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  setPrimary(accountId: number) {
    this.profileService.profileSetPrimary({ accountId }).subscribe(() => {
      this.uiSuccess('profileSaved');
      this.authService.loadUserInfo();
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  deleteWgAccount(accountId: number) {
    this.dynamicDialog.open({
      content: this.translate.instant('profile.wgAccounts.delete.content'),
      config: {
        header: this.translate.instant('profile.wgAccounts.delete.header')
      },
      buttons: [
        {
          id: 'cancel',
          class: 'p-button-secondary',
          label: this.translate.instant('profile.wgAccounts.delete.cancel')
        },
        {
          id: 'ok',
          class: 'p-button-danger',
          icon: 'pi pi-trash',
          label: this.translate.instant('profile.wgAccounts.delete.delete')
        }
      ]
    }).pipe(switchMap(id => {
      if (id === 'ok') {
        return this.profileService.profileDeleteWgAccount({ accountId }).pipe(tap(() => {
          this.uiSuccess('profileSaved');
          this.router.navigate(['.'], { relativeTo: this.route });
        }));
      } else {
        return of(id);
      }
    })).subscribe();
  }

  async login(event: MouseEvent, region: Region) {
    event.stopPropagation();
    event.cancelBubble = true;
    this.selectingRegion = false;
    await this.authService.login({ renderer: this.renderer, region }).toPromise();
    this.uiSuccess('profileSaved');
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
