import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ClanInfoAppModel } from '@generated/models';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-team-overlay',
  templateUrl: './team-overlay.component.html'
})
export class TeamOverlayComponent extends BaseComponent implements OnInit {

  @Input()
  clan: ClanInfoAppModel;

  constructor(private panel: OverlayPanel) {
    super();
  }

  ngOnInit(): void {

  }

  close(event: MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    this.panel.hide();
  }
}
