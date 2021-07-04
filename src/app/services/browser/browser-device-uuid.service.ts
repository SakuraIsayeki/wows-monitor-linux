import { DeviceUuidService } from '@services/device-uuid.service';
import * as deviceUuid from 'device-uuid';

export class BrowserDeviceUuidService implements DeviceUuidService {

  private du: any;

  constructor() {
    this.du = new deviceUuid.DeviceUUID().parse();
  }

  getUuid(): string {
    const du = this.du;
    const dua = [
      du.language,
      du.platform,
      du.geoIp,
      du.os,
      du.cpuCores,
      du.isAuthoritative,
      du.silkAccelerated,
      du.isKindleFire,
      du.isDesktop,
      du.isMobile,
      du.isTablet,
      du.isWindows,
      du.isLinux,
      du.isLinux64,
      du.isMac,
      du.isiPad,
      du.isiPhone,
      du.isiPod,
      du.isSmartTV,
      du.pixelDepth,
      du.isTouchScreen
    ];
    return this.toGuid(du.hashMD5(dua.join(':')));
  }

  private toGuid(md5Hash: string){
      return (
        md5Hash.substring(0, 8) +
        '-' +
        md5Hash.substring(8, 12) +
        '-' +
        md5Hash.substring(12, 16) +
        '-' +
        md5Hash.substring(16, 20) +
        '-' +
        md5Hash.substring(20)
      ).toLowerCase();
  }
}
