import { FormGroup, FormControl } from '@angular/forms'

export interface LivefeedConfig {
  liveUpdate?: boolean;
  favsOnly?: boolean;
  notification?: boolean;
  notificationFavsOnly?: boolean;
  homeScroller?: boolean;
  entries?: number;
  showFilters?: boolean;
}

export const defaultLivefeedConfig: LivefeedConfig = {
  liveUpdate: false,
  favsOnly: false,
  notification: true,
  notificationFavsOnly: false,
  homeScroller: false,
  entries: 100,
  showFilters: true
}

export class LivefeedForm extends FormGroup {
  constructor(config: LivefeedConfig) {
    super({});

    this.addControl('liveUpdate', new FormControl(config.liveUpdate));
    this.addControl('favsOnly', new FormControl(config.favsOnly));
    this.addControl('notification', new FormControl(config.notification));
    this.addControl('notificationFavsOnly', new FormControl(config.liveUpdate));
    this.addControl('homeScroller', new FormControl(config.homeScroller));
    this.addControl('entries', new FormControl(config.entries));
    this.addControl('showFilters', new FormControl(config.showFilters));
  }

  get model() {
    return {
      liveUpdate: this.liveUpdate.value,
      favsOnly: this.favsOnly.value,
      notification: this.notification.value,
      notificationFavsOnly: this.notificationFavsOnly.value,
      homeScroller: this.homeScroller.value,
      entries: this.entries.value,
      showFilters: this.showFilters.value
    } as LivefeedConfig;
  }

  get liveUpdate() {
    return this.get('liveUpdate');
  }

  get favsOnly() {
    return this.get('favsOnly');
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

  get showFilters() {
    return this.get('showFilters');
  }
}
