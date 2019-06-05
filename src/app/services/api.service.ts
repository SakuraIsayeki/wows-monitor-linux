import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'src/config/config';
import { Region } from '../interfaces/region';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  public sendStats(tempArenaInfoJson: string, region: Region) {
    return this.httpClient.post(environment.apiUrl + '/stats?token=' + this.config.signalRToken, tempArenaInfoJson, {
      headers: {
        'content-type': 'application/json',
        'x-region': region.toString()
      }
    });
  }

  public token() {
    return this.httpClient.get(environment.apiUrl + '/qr/token', { responseType: 'text' });
  }
}
