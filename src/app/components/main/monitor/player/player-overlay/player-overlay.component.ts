import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { PlayerAppModel } from '@generated/models/player-app-model';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-player-overlay',
  templateUrl: './player-overlay.component.html'
})
export class PlayerOverlayComponent extends BaseComponent implements OnInit {

  @Input()
  player: PlayerAppModel;

  constructor(private panel: OverlayPanel) {
    super();
  }


  ngOnInit(): void {
  }

  close() {
    this.panel.hide();
  }
}
