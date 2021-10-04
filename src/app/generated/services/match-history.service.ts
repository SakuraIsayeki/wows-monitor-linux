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

import { MatchAppModel } from '../models/match-app-model';
import { MatchListRequest } from '../models/match-list-request';
import { PagedResultOfMatchListAppModel } from '../models/paged-result-of-match-list-app-model';

@Injectable({
  providedIn: 'root',
})
export class MatchHistoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation matchHistoryList
   */
  static readonly MatchHistoryListPath = '/matchhistory/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchHistoryList()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchHistoryList$Response(params: {
    body: MatchListRequest
  }): Observable<StrictHttpResponse<PagedResultOfMatchListAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, MatchHistoryService.MatchHistoryListPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedResultOfMatchListAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchHistoryList$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matchHistoryList(params: {
    body: MatchListRequest
  }): Observable<PagedResultOfMatchListAppModel> {

    return this.matchHistoryList$Response(params).pipe(
      map((r: StrictHttpResponse<PagedResultOfMatchListAppModel>) => r.body as PagedResultOfMatchListAppModel)
    );
  }

  /**
   * Path part for operation matchHistoryDetail
   */
  static readonly MatchHistoryDetailPath = '/matchhistory/detail/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matchHistoryDetail()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchHistoryDetail$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<MatchAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, MatchHistoryService.MatchHistoryDetailPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatchAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `matchHistoryDetail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matchHistoryDetail(params: {
    id: number;
  }): Observable<MatchAppModel> {

    return this.matchHistoryDetail$Response(params).pipe(
      map((r: StrictHttpResponse<MatchAppModel>) => r.body as MatchAppModel)
    );
  }

}
