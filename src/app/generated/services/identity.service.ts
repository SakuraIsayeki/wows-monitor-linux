/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CustomUserInfoResult } from '../models/custom-user-info-result';
import { TokenAppModel } from '../models/token-app-model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation identityRefreshToken
   */
  static readonly IdentityRefreshTokenPath = '/identity/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `identityRefreshToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityRefreshToken$Response(params?: {
    refreshToken?: string;
    deviceId?: string;
  }): Observable<StrictHttpResponse<TokenAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.IdentityRefreshTokenPath, 'get');
    if (params) {
      rb.query('refreshToken', params.refreshToken, {});
      rb.query('deviceId', params.deviceId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `identityRefreshToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityRefreshToken(params?: {
    refreshToken?: string;
    deviceId?: string;
  }): Observable<TokenAppModel> {

    return this.identityRefreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<TokenAppModel>) => r.body as TokenAppModel)
    );
  }

  /**
   * Path part for operation identityLogout
   */
  static readonly IdentityLogoutPath = '/identity/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `identityLogout()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityLogout$Response(params?: {
    deviceId?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.IdentityLogoutPath, 'get');
    if (params) {
      rb.query('deviceId', params.deviceId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `identityLogout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityLogout(params?: {
    deviceId?: string;
  }): Observable<void> {

    return this.identityLogout$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation identityUserInfo
   */
  static readonly IdentityUserInfoPath = '/identity/userinfo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `identityUserInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityUserInfo$Response(params?: {
  }): Observable<StrictHttpResponse<CustomUserInfoResult>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.IdentityUserInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomUserInfoResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `identityUserInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  identityUserInfo(params?: {
  }): Observable<CustomUserInfoResult> {

    return this.identityUserInfo$Response(params).pipe(
      map((r: StrictHttpResponse<CustomUserInfoResult>) => r.body as CustomUserInfoResult)
    );
  }

}
