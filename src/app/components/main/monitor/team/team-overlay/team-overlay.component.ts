import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ClanInfo } from '@generated/models/clan-info';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-team-overlay',
  templateUrl: './team-overlay.component.html'
})
export class TeamOverlayComponent extends BaseComponent implements OnInit {

  @Input()
  clan: ClanInfo;

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
