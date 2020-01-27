import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { LivefeedService } from 'src/app/services/livefeed.service';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  animations: [
    // nice stagger effect when showing existing elements
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),
    ]),
    trigger('showHideAnimation', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: '0', opacity: 0 }),
        animate(300, style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class LivefeedComponent extends BaseComponent implements OnInit {

  faFilter = faFilter;

  constructor(public service: LivefeedService) {
    super();
  }

  ngOnInit() {
  }

}
