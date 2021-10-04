import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '@components/base.component';
import { ProfileAppModel } from '@generated/models';
import { Region } from '@generated/models/region';
import { IdentityService } from '@generated/services/identity.service';
import { ProfileService } from '@generated/services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { DeviceUuidService, DeviceUuidServiceToken } from '@services/device-uuid.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { AUTHSERVICETOKEN, DynamicDialogService } from '@stewie/framework';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

marker('profile.patreon.tiers.1');
marker('profile.patreon.tiers.2');

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent implements OnInit {

  ownUuid: string;
  profile = this.route.data.pipe(this.untilDestroy(), map(data => data.profile as ProfileAppModel));
  patreonAccount = this.profile.pipe(map(p => {
    return [{ patreonName: p.patreonName, patreonTier: p.patreonTier }];
  }));
  selectingRegion: boolean;

  constructor(private route: ActivatedRoute,
              private renderer: Renderer2,
              private profileService: ProfileService,
              private translate: TranslateService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
              private dynamicDialog: DynamicDialogService,
              private identityService: IdentityService,
              @Inject(DeviceUuidServiceToken) private uuidService: DeviceUuidService) {
    super();
    this.ownUuid = this.uuidService.getUuid();
  }

  ngOnInit(): void {
  }

  setSync(value: boolean) {
    this.profileService.profileSetSyncSettings({ syncSettings: value }).subscribe(() => {
      this.uiSuccess('profileSaved');
      this.authService.loadUserInfo();
      this.router.navigate(['.'], { relativeTo: this.route });
    });
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  logoutDevice(deviceId: string) {
    this.dynamicDialog.open({
      content: this.translate.instant('profile.devices.logout.content'),
      config: {
        header: this.translate.instant('profile.devices.logout.header')
      },
      buttons: [
        {
          id: 'cancel',
          class: 'p-button-secondary',
          label: this.translate.instant('profile.devices.logout.cancel')
        },
        {
          id: 'ok',
          class: 'p-button-danger',
          icon: 'pi pi-sign-out',
          label: this.translate.instant('profile.devices.logout.logout')
        }
      ]
    }).subscribe(id => {
      if (id === 'ok') {
        this.identityService.identityLogout({ deviceId: deviceId }).subscribe(() => {
          this.uiSuccess('deviceLoggedOut');
          this.router.navigate(['.'], { relativeTo: this.route });
        });
      }
    });
  }

  connectPatreon() {
    this.authService.connectPatreon(this.renderer).pipe(switchMap(() => this.authService.getRefreshToken())).subscribe(() => {
      this.authService.loadUserInfo();
      this.uiSuccess('profileSaved');
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  deletePatreonAccount() {
    this.dynamicDialog.open({
      content: this.translate.instant('profile.patreon.delete.content'),
      config: {
        header: this.translate.instant('profile.patreon.delete.header')
      },
      buttons: [
        {
          id: 'cancel',
          class: 'p-button-secondary',
          label: this.translate.instant('profile.patreon.delete.cancel')
        },
        {
          id: 'ok',
          class: 'p-button-danger',
          icon: 'pi pi-trash',
          label: this.translate.instant('profile.patreon.delete.delete')
        }
      ]
    }).pipe(switchMap(id => {
      if (id === 'ok') {
        return this.profileService.profileDeletePatreonAccount().pipe(
          switchMap(() => this.authService.getRefreshToken()),
          tap(() => {
            this.authService.loadUserInfo();
            this.uiSuccess('profileSaved');
            this.router.navigate(['.'], { relativeTo: this.route });
          }));
      } else {
        return of(id);
      }
    })).subscribe();
  }
}
