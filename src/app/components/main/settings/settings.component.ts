import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Config } from 'src/config/config';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy {

  fontSizeOptions: SelectItem[] = [
    {
      label: 'settings.appearence.fontsize.items.normal',
      value: 'normal'
    },
    {
      label: 'settings.appearence.fontsize.items.big',
      value: 'big'
    },
    {
      label: 'settings.appearence.fontsize.items.huge',
      value: 'huge'
    }
  ]

  constructor(public config: Config) {
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.config.save();
  }
}
