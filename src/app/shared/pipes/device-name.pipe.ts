import { Pipe, PipeTransform } from '@angular/core';
import * as deviceUuid from 'device-uuid';

@Pipe({
  name: 'deviceName'
})
export class DeviceNamePipe implements PipeTransform {

  transform(value: string) {
    const ua = new deviceUuid.DeviceUUID().parse(value);
    if(ua.source.includes('Electron')){
      return 'Desktop App'
    }
    return `${ua.browser} ${ua.version}`;
  }

}
