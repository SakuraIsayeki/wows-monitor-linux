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
   * Path part for operation configGet
   */
  static readonly ConfigGetPath = '/config/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  configGet$Response(params?: {
  }): Observable<StrictHttpResponse<AppConfig>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigService.ConfigGetPath, 'get');
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
   * To access the full response (for headers, for example), `configGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configGet(params?: {
  }): Observable<AppConfig> {

    return this.configGet$Response(params).pipe(
      map((r: StrictHttpResponse<AppConfig>) => r.body as AppConfig)
    );
  }

  /**
   * Path part for operation configSave
   */
  static readonly ConfigSavePath = '/config/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configSave$Response(params: {
    body: AppConfig
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigService.ConfigSavePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `configSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configSave(params: {
    body: AppConfig
  }): Observable<Blob> {

    return this.configSave$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
