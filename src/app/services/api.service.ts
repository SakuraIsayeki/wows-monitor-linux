import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'src/config/config';
import { Region } from '../interfaces/region';
import { Changelog } from '../interfaces/changelog';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  sendStats(tempArenaInfoJson: string, region: Region) {
    return this.httpClient.post(environment.apiUrl + '/stats?token=' + this.config.signalRToken, tempArenaInfoJson, {
      headers: {
        'content-type': 'application/json',
        'x-region': region.toString()
      }
    });
  }

  changelogLatest() {
    return this.httpClient.get<Changelog>((environment.apiUrl + '/changelog/latest'), { observe: 'body' });
  }

  changelogIds() {
    return this.httpClient.get<number[]>((environment.apiUrl + '/changelog/ids'), { observe: 'body' });
  }


  changelogList() {
    return this.httpClient.get<Changelog[]>((environment.apiUrl + '/changelog/list'), { observe: 'body' });
  }

  changelogDetail(id: number) {
    return this.httpClient.post<Changelog>((environment.apiUrl + '/changelog/detail?id=' + id.toString()), { observe: 'body' });
  }

  token() {
    return this.httpClient.get(environment.apiUrl + '/qr/token', { responseType: 'text' });
  }
}
