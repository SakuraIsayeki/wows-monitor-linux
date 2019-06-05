import { Component, OnInit, Inject, Input, ElementRef, ViewChild, Optional } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { MenuItem } from 'primeng/api';
import { ElectronService } from 'src/app/services/desktop/electron.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent extends BaseComponent implements OnInit {

  @Input()
  public clan: any;

  @Input()
  public team: any;

  @Input()
  public cw: boolean;

  public showDialog = false;

  @ViewChild('weblink', { static: false })
  public weblink: ElementRef<HTMLLinkElement>;

  public items: MenuItem[] = [
    {
      label: 'monitor.teamPopup.info',
      command: () => this.showDialog = true
    },
    {
      label: 'monitor.teamPopup.wowsNumbers',
      command: () => {
        if (this.isBrowser) {
          window.open(this.weblink.nativeElement.href, '_blank');
        } else {
          this.electronService.shell.openExternal(this.weblink.nativeElement.href);
        }
      }
    }
  ];

  constructor(public el: ElementRef, @Optional() private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
  }

}
