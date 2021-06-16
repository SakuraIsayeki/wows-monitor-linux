import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BaseComponent } from '@components/base.component';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-value-label',
  templateUrl: './value-label.component.html'
})
export class ValueLabelComponent extends BaseComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  icon: IconDefinition;

  constructor(public settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
  }

}
