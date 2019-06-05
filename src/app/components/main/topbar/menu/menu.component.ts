import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { MenuEntry } from 'src/app/interfaces/menu-entry';
import { faQuestionCircle, faCog, faHome, faDesktop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  @Input()
  public closeAction: () => void;

  public menu: MenuEntry[] = [
    {
      key: 'meta.monitor.title',
      routerLink: '/home',
      icon: faDesktop
    },
    {
      key: 'meta.settings.title',
      routerLink: '/home/settings',
      icon: faCog
    },
    {
      key: 'meta.about.title',
      routerLink: '/home/about',
      icon: faQuestionCircle
    }
  ];

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
