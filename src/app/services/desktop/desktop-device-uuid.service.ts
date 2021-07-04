import { DeviceUuidService } from '@services/device-uuid.service';
import { machineIdSync } from 'node-machine-id';


export class DesktopDeviceUuidService implements DeviceUuidService {

  getUuid(): string {
    return machineIdSync(true);
  }

  getName() {
    return encodeURIComponent(btoa(navigator.userAgent));
  }
}
