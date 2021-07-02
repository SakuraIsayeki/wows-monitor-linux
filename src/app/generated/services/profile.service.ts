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

import { ProfileAppModel } from '../models/profile-app-model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation profileGet
   */
  static readonly ProfileGetPath = '/profile/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileGet$Response(params?: {
  }): Observable<StrictHttpResponse<ProfileAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProfileAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileGet(params?: {
  }): Observable<ProfileAppModel> {

    return this.profileGet$Response(params).pipe(
      map((r: StrictHttpResponse<ProfileAppModel>) => r.body as ProfileAppModel)
    );
  }

  /**
   * Path part for operation profileSetPublic
   */
  static readonly ProfileSetPublicPath = '/profile/setPublic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileSetPublic()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileSetPublic$Response(params?: {
    accountId?: number;
    value?: boolean;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileSetPublicPath, 'post');
    if (params) {
      rb.query('accountId', params.accountId, {});
      rb.query('value', params.value, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileSetPublic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileSetPublic(params?: {
    accountId?: number;
    value?: boolean;
  }): Observable<Blob> {

    return this.profileSetPublic$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation profileSetPrimary
   */
  static readonly ProfileSetPrimaryPath = '/profile/setPrimary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileSetPrimary()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileSetPrimary$Response(params?: {
    accountId?: number;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileSetPrimaryPath, 'post');
    if (params) {
      rb.query('accountId', params.accountId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileSetPrimary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileSetPrimary(params?: {
    accountId?: number;
  }): Observable<Blob> {

    return this.profileSetPrimary$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation profileDeleteWgAccount
   */
  static readonly ProfileDeleteWgAccountPath = '/profile/deleteWgAccount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileDeleteWgAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileDeleteWgAccount$Response(params?: {
    accountId?: number;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileDeleteWgAccountPath, 'post');
    if (params) {
      rb.query('accountId', params.accountId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileDeleteWgAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileDeleteWgAccount(params?: {
    accountId?: number;
  }): Observable<Blob> {

    return this.profileDeleteWgAccount$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
