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

import { ChangelogAppModel } from '../models/changelog-app-model';

@Injectable({
  providedIn: 'root',
})
export class ChangelogService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation changelogLatest
   */
  static readonly ChangelogLatestPath = '/changelog/latest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changelogLatest()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogLatest$Response(params?: {
    channel?: string;
  }): Observable<StrictHttpResponse<ChangelogAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, ChangelogService.ChangelogLatestPath, 'get');
    if (params) {
      rb.query('channel', params.channel, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChangelogAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changelogLatest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogLatest(params?: {
    channel?: string;
  }): Observable<ChangelogAppModel> {

    return this.changelogLatest$Response(params).pipe(
      map((r: StrictHttpResponse<ChangelogAppModel>) => r.body as ChangelogAppModel)
    );
  }

  /**
   * Path part for operation changelogIds
   */
  static readonly ChangelogIdsPath = '/changelog/ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changelogIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogIds$Response(params?: {
    channel?: string;
  }): Observable<StrictHttpResponse<Array<number>>> {

    const rb = new RequestBuilder(this.rootUrl, ChangelogService.ChangelogIdsPath, 'get');
    if (params) {
      rb.query('channel', params.channel, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<number>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changelogIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogIds(params?: {
    channel?: string;
  }): Observable<Array<number>> {

    return this.changelogIds$Response(params).pipe(
      map((r: StrictHttpResponse<Array<number>>) => r.body as Array<number>)
    );
  }

  /**
   * Path part for operation changelogList
   */
  static readonly ChangelogListPath = '/changelog/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changelogList()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogList$Response(params?: {
    channel?: string;
  }): Observable<StrictHttpResponse<Array<ChangelogAppModel>>> {

    const rb = new RequestBuilder(this.rootUrl, ChangelogService.ChangelogListPath, 'get');
    if (params) {
      rb.query('channel', params.channel, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChangelogAppModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changelogList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogList(params?: {
    channel?: string;
  }): Observable<Array<ChangelogAppModel>> {

    return this.changelogList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ChangelogAppModel>>) => r.body as Array<ChangelogAppModel>)
    );
  }

  /**
   * Path part for operation changelogDetail
   */
  static readonly ChangelogDetailPath = '/changelog/detail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changelogDetail()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogDetail$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<ChangelogAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, ChangelogService.ChangelogDetailPath, 'post');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChangelogAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changelogDetail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changelogDetail(params?: {
    id?: number;
  }): Observable<ChangelogAppModel> {

    return this.changelogDetail$Response(params).pipe(
      map((r: StrictHttpResponse<ChangelogAppModel>) => r.body as ChangelogAppModel)
    );
  }

}
