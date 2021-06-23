import { Injectable, Renderer2 } from '@angular/core';
import { environment } from '@environments/environment';
import { CustomUserInfoResult } from '@generated/models/custom-user-info-result';
import { Region } from '@generated/models/region';
import { IdentityService } from '@generated/services/identity.service';
import { AuthService } from '@stewie/framework/lib/auth/auth.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

export class TokenResponse {
  token: string;
  refreshToken: string;
}

@Injectable()
export class JwtAuthService implements AuthService {

  private _userinfo$ = new BehaviorSubject<CustomUserInfoResult>(null);
  private _isLoaded$ = new BehaviorSubject(false);

  constructor(private identityService: IdentityService) {
    this.loadUserInfo();
  }

  get isAuthenticated() {
    return this._userinfo$.value?.isAuthenticated;
  }

  get userInfo() {
    return this._userinfo$.value;
  }

  get isLoaded$() {
    return this._isLoaded$.asObservable();
  }

  userInfo$: Observable<CustomUserInfoResult> = this._userinfo$.asObservable();


  isInRole(role: string): boolean {
    return this._userinfo$.value?.roles?.includes(role.toLowerCase());
  }


  private windowRef: Window;
  private listener: () => void;
  private lastUrl: string = null;

  login(model: { renderer: Renderer2, region: Region }): Observable<any> {
    const url = environment.apiUrl + `/identity/login/${model.region}?opener=` + window.location.origin;
    const features = this.getFeatures();

    return new Observable(sub => {
      if (this.listener) {
        this.listener();
      }

      this.listener = model.renderer.listen('window', 'message', (event) => {
        if (event.origin !== environment.apiUrl || event.data.type !== 'auth-callback') {
          return;
        }
        this.windowRef.close();
        this.windowRef = null;

        const tokenResponse = event.data as TokenResponse;
        localStorage.setItem('token', tokenResponse.token);
        localStorage.setItem('refreshToken', tokenResponse.refreshToken);
        this.loadUserInfo();
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
  }

  logout(): Subscription {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._userinfo$.next(null);
    return of().subscribe();
  }

  loadUserInfo(): any {
    this._isLoaded$.next(false);
    this.identityService.identityUserInfo().subscribe(userInfo => {
      if (userInfo.roles) {
        userInfo.roles = userInfo.roles.map(role => role.toLowerCase());
      }

      this._userinfo$.next(userInfo);
      this._isLoaded$.next(true);
    });
  }


  private getFeatures() {
    const width = Math.min(450, window.outerWidth);
    const height = Math.min(600, window.outerHeight);
    const x = window.screenX + ((window.outerWidth - width) / 2);
    const y = window.screenY + ((window.outerHeight - height) / 2);

    return `menubar=no,toolbar=no,frame=true,left=${x},top=${y},width=${width},height=${height}`;
  }
}
