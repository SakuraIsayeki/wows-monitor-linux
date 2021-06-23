import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdentityService } from '@generated/services/identity.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { AUTHSERVICETOKEN, LocatorService } from '@stewie/framework';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private get authService() {
    return LocatorService.Injector.get(AUTHSERVICETOKEN) as JwtAuthService;
  }

  private get identityService() {
    return LocatorService.Injector.get(IdentityService) as IdentityService;
  }

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');

    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError(err => {
        // in case of 401 http error
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // get refresh tokens
          const refreshToken = localStorage.getItem('refreshToken');

          // if there are tokens then send refresh token request
          if (refreshToken && accessToken) {
            return this.refreshToken(refreshToken, req, next);
          }

          // otherwise logout and redirect to login page
          return this.logout(err);
        }

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logout(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return request;
  }

  private logout(err): Observable<HttpEvent<any>> {
    this.authService.logout();
    return throwError(err);
  }

  private refreshToken(refreshToken: string, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);

      return this.identityService.identityRefreshToken({ refreshToken }).pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res.token);
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, res.token));
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}
