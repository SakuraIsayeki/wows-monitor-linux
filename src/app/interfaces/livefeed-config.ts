import { FormGroup, FormControl } from '@angular/forms'

export interface LivefeedConfig {
  liveUpdate?: boolean;
  notification?: boolean;
  notificationFavsOnly?: boolean;
  homeScroller?: boolean;
  entries?: number;
}

export const defaultLivefeedConfig: LivefeedConfig = {
  liveUpdate: false,
  notification: true,
  notificationFavsOnly: false,
  homeScroller: false,
  entries: 10
}

export class LivefeedForm extends FormGroup {
  constructor(config: LivefeedConfig) {
    super({});

    this.addControl('liveUpdate', new FormControl(config.liveUpdate));
    this.addControl('notification', new FormControl(config.notification));
    this.addControl('notificationFavsOnly', new FormControl(config.liveUpdate));
    this.addControl('homeScroller', new FormControl(config.homeScroller));
    this.addControl('entries', new FormControl(config.entries));
  }

  get model() {
    return {
      liveUpdate: this.liveUpdate.value,
      notification: this.notification.value,
      notificationFavsOnly: this.notificationFavsOnly.value,
      homeScroller: this.homeScroller.value,
      entries: this.entries.value,
    } as LivefeedConfig;
  }

  get liveUpdate() {
    return this.get('liveUpdate');
  }

  get notification() {
    return this.get('notification');
  }

  get notificationFavsOnly() {
    return this.get('notificationFavsOnly');
  }

  get homeScroller() {
    return this.get('homeScroller');
  }

  get entries() {
    return this.get('entries');
  }
}