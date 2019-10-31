import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent extends BaseComponent implements OnInit {

  @ViewChild(MenuComponent, { static: true })
  public appMenu: MenuComponent

  menuIcon = faBars;
  sidebarVisible = false;

  constructor(@Inject(SignalrServiceToken) public signalrService: SignalrService
  ) {
    super();
  }

  ngOnInit() {
  }

  toggleSidebar = () => {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
