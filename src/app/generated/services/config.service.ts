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

import { AppConfig } from '../models/app-config';
import { UserInfoResult } from '../models/user-info-result';

@Injectable({
  providedIn: 'root',
})
export class ConfigService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation configDefault
   */
  static readonly ConfigDefaultPath = '/config/default';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configDefault()` instead.
   *
   * This method doesn't expect any request body.
   */
  configDefault$Response(params?: {
  }): Observable<StrictHttpResponse<AppConfig>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigService.ConfigDefaultPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AppConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configDefault$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configDefault(params?: {
  }): Observable<AppConfig> {

    return this.configDefault$Response(params).pipe(
      map((r: StrictHttpResponse<AppConfig>) => r.body as AppConfig)
    );
  }

  /**
   * Path part for operation configTest
   */
  static readonly ConfigTestPath = '/config';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configTest()` instead.
   *
   * This method doesn't expect any request body.
   */
  configTest$Response(params?: {
  }): Observable<StrictHttpResponse<UserInfoResult>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigService.ConfigTestPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserInfoResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configTest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configTest(params?: {
  }): Observable<UserInfoResult> {

    return this.configTest$Response(params).pipe(
      map((r: StrictHttpResponse<UserInfoResult>) => r.body as UserInfoResult)
    );
  }

}
