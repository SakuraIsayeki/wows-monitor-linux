/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ClanInfo } from '../models/clan-info';
import { ClanSearchResult } from '../models/clan-search-result';
import { ClanSeason } from '../models/clan-season';
import { HistoryListRequest } from '../models/history-list-request';
import { PagedResultOfCwClanMatch } from '../models/paged-result-of-cw-clan-match';

@Injectable({
  providedIn: 'root',
})
export class ClansService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation clansAutocomplete
   */
  static readonly ClansAutocompletePath = '/clans/autocomplete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clansAutocomplete()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansAutocomplete$Response(params?: {
    query?: null | string;

  }): Observable<StrictHttpResponse<Array<ClanSearchResult>>> {

    const rb = new RequestBuilder(this.rootUrl, ClansService.ClansAutocompletePath, 'post');
    if (params) {

      rb.query('query', params.query);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClanSearchResult>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clansAutocomplete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansAutocomplete(params?: {
    query?: null | string;

  }): Observable<Array<ClanSearchResult>> {

    return this.clansAutocomplete$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClanSearchResult>>) => r.body as Array<ClanSearchResult>)
    );
  }

  /**
   * Path part for operation clansResolveIds
   */
  static readonly ClansResolveIdsPath = '/clans/resolveIds';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clansResolveIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansResolveIds$Response(params?: {
    ids?: null | string;

  }): Observable<StrictHttpResponse<Array<ClanSearchResult>>> {

    const rb = new RequestBuilder(this.rootUrl, ClansService.ClansResolveIdsPath, 'post');
    if (params) {

      rb.query('ids', params.ids);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClanSearchResult>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clansResolveIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansResolveIds(params?: {
    ids?: null | string;

  }): Observable<Array<ClanSearchResult>> {

    return this.clansResolveIds$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClanSearchResult>>) => r.body as Array<ClanSearchResult>)
    );
  }

  /**
   * Path part for operation clansSeasons
   */
  static readonly ClansSeasonsPath = '/clans/seasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clansSeasons()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansSeasons$Response(params?: {

  }): Observable<StrictHttpResponse<Array<ClanSeason>>> {

    const rb = new RequestBuilder(this.rootUrl, ClansService.ClansSeasonsPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClanSeason>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clansSeasons$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansSeasons(params?: {

  }): Observable<Array<ClanSeason>> {

    return this.clansSeasons$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClanSeason>>) => r.body as Array<ClanSeason>)
    );
  }

  /**
   * Path part for operation clansDetail
   */
  static readonly ClansDetailPath = '/clans/detail/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clansDetail()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansDetail$Response(params: {
    id: number;
    seasonId?: null | number;

  }): Observable<StrictHttpResponse<ClanInfo>> {

    const rb = new RequestBuilder(this.rootUrl, ClansService.ClansDetailPath, 'post');
    if (params) {

      rb.path('id', params.id);
      rb.query('seasonId', params.seasonId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClanInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clansDetail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clansDetail(params: {
    id: number;
    seasonId?: null | number;

  }): Observable<ClanInfo> {

    return this.clansDetail$Response(params).pipe(
      map((r: StrictHttpResponse<ClanInfo>) => r.body as ClanInfo)
    );
  }

  /**
   * Path part for operation clansHistory
   */
  static readonly ClansHistoryPath = '/clans/history';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clansHistory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clansHistory$Response(params: {

    body: HistoryListRequest
  }): Observable<StrictHttpResponse<PagedResultOfCwClanMatch>> {

    const rb = new RequestBuilder(this.rootUrl, ClansService.ClansHistoryPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedResultOfCwClanMatch>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clansHistory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clansHistory(params: {

    body: HistoryListRequest
  }): Observable<PagedResultOfCwClanMatch> {

    return this.clansHistory$Response(params).pipe(
      map((r: StrictHttpResponse<PagedResultOfCwClanMatch>) => r.body as PagedResultOfCwClanMatch)
    );
  }

}
