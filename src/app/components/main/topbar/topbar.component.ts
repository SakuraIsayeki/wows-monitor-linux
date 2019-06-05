import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent extends BaseComponent implements OnInit {

  public menuIcon = faBars;
  public sidebarVisible = false;

  constructor(@Inject(SignalrServiceToken) public signalrService: SignalrService
  ) {
    super();
  }

  ngOnInit() {
  }

  public toggleSidebar = () => {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
