import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@stewie/framework';
import * as Showdown from 'showdown';
import { getShowdownConverter } from './showdown-converter';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html'
})
export class ShowdownComponent extends BaseComponent implements OnInit {

  @Input()
  markdown: string;

  html: string;

  private converter: Showdown.Converter = getShowdownConverter();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markdown']) {
      this.html = this.converter.makeHtml(changes['markdown'].currentValue);
    }
  }

  markdownClick(event: MouseEvent) {
    if ((<HTMLLinkElement> event.target).tagName === 'A') {
      (<HTMLLinkElement> event.target).setAttribute('target', '_blank');
    }
  }

}
