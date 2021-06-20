import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
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

  @Input()
  solo: boolean;

  faUser = faUser;

  constructor(public settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
  }

}
