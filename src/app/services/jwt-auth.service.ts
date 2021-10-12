import { Inject, Injectable, Renderer2 } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { environment } from '@environments/environment';
import { TokenAppModel } from '@generated/models';
import { CustomUserInfoResult } from '@generated/models/custom-user-info-result';
import { Region } from '@generated/models/region';
import { IdentityService } from '@generated/services/identity.service';
import { DeviceUuidService, DeviceUuidServiceToken } from '@services/device-uuid.service';
import { BaseInjection } from '@stewie/framework';
import { AuthService } from '@stewie/framework/lib/auth/auth.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

marker('uimessages.apiError.alreadyConnected.summary');
marker('uimessages.apiError.alreadyConnected.details');
marker('uimessages.apiError.wgError.summary');
marker('uimessages.apiError.wgError.details');

@Injectable()
export class JwtAuthService extends BaseInjection implements AuthService {

  private _userinfo$ = new BehaviorSubject<CustomUserInfoResult>(null);
  private _isLoaded$ = new BehaviorSubject(false);

  constructor(private identityService: IdentityService,
              @Inject(DeviceUuidServiceToken) private uuid: DeviceUuidService) {
    super();
    this.getRefreshToken().subscribe(() => {
      this.loadUserInfo();
    }, err => {
      this.loadUserInfo();
    });
  }

  get isAuthenticated() {
    return this._userinfo$.value?.isAuthenticated;
  }

  get isAuthenticated$() {
    return this._userinfo$.pipe(map(u => u.isAuthenticated));
  }

  get userInfo() {
    return this._userinfo$.value;
  }

  get isLoaded$() {
    return this._isLoaded$.asObservable();
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  get refreshToken() {
    return localStorage.getItem('refreshToken');
  }

  set token(value) {
    sessionStorage.setItem('token', value);
  }

  set refreshToken(value) {
    localStorage.setItem('refreshToken', value);
  }

  userInfo$: Observable<CustomUserInfoResult> = this._userinfo$.asObservable();


  isInRole(role: string): boolean {
    return this._userinfo$.value?.roles?.includes(role.toLowerCase());
  }


  private windowRef: Window;
  private listener: () => void;
  private lastUrl: string = null;

  login(model: { renderer: Renderer2, region: Region }): Observable<any> {
    let url = environment.apiUrl + `/identity/login/${model.region}?opener=` + window.location.origin;
    url += '&device_id=' + this.uuid.getUuid();

    const refreshObs = !this.isAuthenticated
      ? of(null)
      : this.getRefreshToken(this.refreshToken).pipe(tap(() => {
        url += '&Authorization=' + this.token;
      }));

    const features = this.getFeatures();

    const windowObs = new Observable(sub => {
      if (this.listener) {
        this.listener();
      }

      this.listener = model.renderer.listen('window', 'message', (event) => {
        if (event.origin !== environment.apiUrl || event.data.type !== 'auth-callback') {
          return;
        }

        this.windowRef.close();
        this.windowRef = null;

        if (event.data.error) {
          this.uiError(event.data.error);
        } else {
          const tokenResponse = event.data as TokenAppModel;
          this.token = tokenResponse.token;
          this.refreshToken = tokenResponse.refreshToken;
          this.loadUserInfo();
        }


        sub.next();
        sub.complete();
      });

      if (this.windowRef === null || this.windowRef?.closed) {
        this.windowRef = window.open(url, 'monitor-auth', features);
      } else if (this.lastUrl !== url) {
        this.lastUrl = url;
        this.windowRef = window.open(url, 'monitor-auth', features);
        this.windowRef.focus();
      } else {
        this.windowRef.focus();
      }
    });

    return refreshObs.pipe(switchMap(() => {
      return windowObs;
    }));
  }

  logout(onlyLocal: boolean = false): Subscription {
    if (onlyLocal) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.loadUserInfo();
      return of().subscribe();
    }

    return this.identityService.identityLogout({ deviceId: this.uuid.getUuid() }).subscribe(() => {
      sessionStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.loadUserInfo();
    });
  }

  loadUserInfo(): any {
    this._isLoaded$.next(false);
    this.identityService.identityUserInfo().subscribe(userInfo => {
      if (userInfo.roles) {
        userInfo.roles = userInfo.roles.map(role => role.toLowerCase());
      }

      this._userinfo$.next(userInfo);
      this._isLoaded$.next(true);
    }, err => {
      this._userinfo$.next({});
      this._isLoaded$.next(true);
    });
  }

  connectPatreon(renderer: Renderer2): Observable<any> {
    let url = environment.apiUrl + `/identity/external/login-patreon?opener=` + window.location.origin;
    url += '&device_id=' + this.uuid.getUuid();
    url += '&Authorization=' + this.token;

    const features = this.getFeatures();

    return new Observable(sub => {
      if (this.listener) {
        this.listener();
      }

      this.listener = renderer.listen('window', 'message', (event) => {
        if (event.origin !== environment.apiUrl || event.data.type !== 'auth-callback') {
          return;
        }

        this.windowRef.close();
        this.windowRef = null;

        if (event.data.error) {
          this.uiError(event.data.error);
        }

        sub.next();
        sub.complete();
      });

      if (this.windowRef === null || this.windowRef?.closed) {
        this.windowRef = window.open(url, 'patreon-auth', features);
      } else if (this.lastUrl !== url) {
        this.lastUrl = url;
        this.windowRef = window.open(url, 'patreon-auth', features);
        this.windowRef.focus();
      } else {
        this.windowRef.focus();
      }
    });
  }

  public getRefreshToken(refreshToken?: string): Observable<TokenAppModel> {
    if (!refreshToken) {
      refreshToken = this.refreshToken;
    }
    if (!refreshToken) {
      return of(null);
    }
    return this.identityService.identityRefreshToken({ refreshToken, deviceId: this.uuid.getUuid() }).pipe(
      tap(res => {
        this.token = res.token;
        this.refreshToken = res.refreshToken;
      }, err => {
        this.logout(true);
      }));
  }


  private getFeatures() {
    const width = Math.min(450, window.outerWidth);
    const height = Math.min(600, window.outerHeight);
    const x = window.screenX + ((window.outerWidth - width) / 2);
    const y = window.screenY + ((window.outerHeight - height) / 2);

    return `menubar=no,toolbar=no,frame=true,left=${x},top=${y},width=${width},height=${height}`;
  }
}
