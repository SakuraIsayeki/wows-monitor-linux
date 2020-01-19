import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BaseComponent } from 'src/app/components/base.component';
import { Config } from 'src/config/config';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-value-label',
  templateUrl: './value-label.component.html'
})
export class ValueLabelComponent extends BaseComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  icon: IconDefinition;

  constructor(public config: Config) {
    super();
  }

  ngOnInit() {
  }

}
